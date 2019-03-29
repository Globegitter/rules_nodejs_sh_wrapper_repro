const {format} = require('date-fns');
//const five = require('five');

function sayDate() {
  let myFive = " five ";
//  myFive += five();
  return 'hello ' + format(new Date(2014, 1, 11), 'MM/dd/YYYY') + myFive;
}

console.log(sayDate());