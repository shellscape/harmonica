'use strict';

const cp = require('child_process');

module.exports = (flags) => {

  const breakpoint = !!process.execArgv.filter(arg => /\-\-(harmony[\w\-]*)/.test(arg)).length;

  flags = flags || ['harmony'];         // all the things by default
  flags = Array.from(new Set(flags));   // force uniqueness
  flags = flags.map((f) => '--' + f);   // prepend --

  if (breakpoint) {
    return;
  }

  let command = process.argv[0],
    script = process.argv.slice(1),
    params = flags.concat(script),
    app = cp.spawn(command, params, { stdio: 'inherit' });

  app.on('close', (code) => {
    process.exit(code);
  });

  // Interrupt process flow in the parent
  process.once('uncaughtException', (e) => {});
  throw new Error('harmony');
};
