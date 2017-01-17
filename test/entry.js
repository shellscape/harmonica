'use strict';

const chalk = require('chalk');
const semver = require('semver');
const version = semver(process.version).major;

let script = './async-await.js',
  flags = ['harmony_for_in', 'harmony-async-await', 'harmony_simd'];

if (version < 6) {
  script = './proxy.js';
  flags = ['harmony_proxies'];
}
else if (version === 6) {
  script = './array-values.js';
  flags = ['harmony_array_prototype_values'];
}

console.log(chalk.blue('  Entered entry.js script'));
console.log(chalk.blue('  Using flags:'), flags);

require('../index.js')(flags);

console.log(chalk.blue('  Passed Initialization'));

require(script);
