var moment = require('moment');

var date = moment();
date.add(1, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

var date2 = moment();

console.log(date2.subtract(8, 'hours').format('HH:mm a'));
console.log(date2.format('H:mm a'));