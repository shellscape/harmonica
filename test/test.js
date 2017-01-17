'use strict';

const chalk = require('chalk');
const cp = require('child_process');
const log = console.log;

log(chalk.magenta('\nHarmonica Test'));
log(chalk.blue('  Spawning entry.js'));

let app = cp.spawn('node', ['test/entry.js'], { stdio: 'inherit' });

app.on('close', (code) => {
  log();

  if (code) {
    log(chalk.red('Failure:'), 'code', code);
  }
  else {
    log(chalk.green('Success'));
  }

  process.exit(code);
});
