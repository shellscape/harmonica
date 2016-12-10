const chalk = require('chalk');

console.log(chalk.blue('  Entered entry.js script'));

require('../index.js')(['harmony-async-await']);

console.log(chalk.blue('  Passed Initialization'));

require('./async-await.js');
