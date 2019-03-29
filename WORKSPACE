load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "01135f2310d5136ecdf89cf70280c4a22c64790eae61ecd67d21bbd05f189b87",
    strip_prefix = "rules_nodejs-ff9042a67febb52eae5ad0392a12300b4a394031",
    url = "https://github.com/bazelbuild/rules_nodejs/archive/ff9042a67febb52eae5ad0392a12300b4a394031.tar.gz",
)

http_archive(
    name = "com_github_atlassian_bazel_tools",
    sha256 = "afed91a52aa6ef069fa6abe80c88512a349b62aa4a617cbba3c93da4b642a123",
    strip_prefix = "bazel-tools-986ed8f71dc910ac8766c920cef56e0e94db5bd0",
    urls = ["https://github.com/atlassian/bazel-tools/archive/986ed8f71dc910ac8766c920cef56e0e94db5bd0.tar.gz"],
)

load("@com_github_atlassian_bazel_tools//:multirun/deps.bzl", "multirun_dependencies")

multirun_dependencies()

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories")

node_repositories(
    node_version = "10.13.0",
    package_json = ["//:package.json"],
    preserve_symlinks = True,
    yarn_version = "1.12.1",
)

load("@build_bazel_rules_nodejs//:defs.bzl", "yarn_install")

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)
