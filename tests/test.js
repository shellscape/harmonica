const chalk = require('chalk');
const cp = require('child_process');
const log = console.log;

log(chalk.magenta('\nHarmonize Test'));
log(chalk.blue('  Spawning entry.js'));

let app = cp.spawn('node', ['tests/entry.js'], { stdio: 'inherit' });

app.on('close', function(code) {
  log();

  if (code) {
    log(chalk.red('Failure:'), 'code', code);
  }
  else {
    log(chalk.green('Success'));
  }

  process.exit(code);
});
