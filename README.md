# rules_nodejs_sh_wrapper_repro

This repository demonstrates two issues, one in relation to the `RUNFILES_DIR` environment variable (https://github.com/bazelbuild/bazel/pull/7774) as well as one issue specific to `rules_nodejs` in regards to how the `RUNFILES` env var is set for the node module resolution.

For the first issue just run:
```bash
bazel run //app # Shows: ERROR: cannot find @bazel_tools//tools/bash/runfiles:runfiles.bash
bazel run //app:app2 # This sets the RUNFILES_DIR env var explictely and works
```

The second issue needs the following commands to be run in this exact order to reproduce:

```bash
bazel clean # To make sure no runfiles directories exist
bazel run //app:app2 # Everything works as expected with the wrapper shell script
bazel build //app:app.binary # This creates the runfiles directories of the nodejs_binary directly
bazel run @nodejs//:yarn -- add five # Adds a new node module dependency that is not included in the runfiles directory above
sed -i -E 's/\/\///g' app/app.js && sed -i -E 's/# "/"/g' app/BUILD.bazel # Uncomments code that makes use of the added module
bazel run //app:app2 # This will now fail
git reset --hard # To reset things again to original
```

The last command fails because the node_launcher.sh is discovering the incorrect runfiles directory from the nodejs_binary directly rather than the wrapper shell script and that is out of date. This is only the case though when the runfiles directory exists. If not the correct runfiles directory is discovered.
