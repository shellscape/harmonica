'use strict';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values
let arr = ['w', 'y', 'k', 'o', 'p'],
  iterator = arr.values(),
  counter = 0;

for (let letter of iterator) {
  counter++;
}

if (counter !== 5) {
  throw 'Array values failure.';
}
