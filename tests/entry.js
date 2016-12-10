const chalk = require('chalk');

console.log(chalk.blue('  Entered entry.js script'));

require('../harmonize.js')(['harmony-async-await']);

console.log(chalk.blue('  Passed Harmonize'))

require('./async-await.js');
