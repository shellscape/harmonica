'use strict';

const chalk = require('chalk');
const cp = require('child_process');
const emoji = require('node-emoji');

module.exports = (flags, options) => {

  const breakpoint = !!process.execArgv.filter(arg => /\-\-(harmony[\w\-]*)/.test(arg)).length;

  if (!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

  if (!options && !Array.isArray(flags)) {
    if (typeof flags === 'object') {
      options = flags;
      flags = null;
    }
    else if (flags) {
      throw new Error(`harmonica's first parameter must be either an Array containing flags or options Object`);
    }
  }

  options = options || {};

  flags = flags || ['harmony'];         // all the things by default
  flags = Array.from(new Set(flags));   // force uniqueness
  flags = flags.map((f) => '--' + f);   // prepend --

  if (breakpoint) {
    return;
  }

  let command = process.argv[0],
    script = process.argv.slice(1),
    params = flags.concat(script),
    app;

  if (!options.silent) {
    let pad = (new Array(15).join(' ')),
      list = chalk.dim(flags.join(`\n${pad}`)),
      message = `${emoji.get('sparkles')}  harmonica: ${list}`;

    process.stdout.write(`\n${message}\n\n`);
  }

  app = cp.spawn(command, params, { stdio: 'inherit' });

  app.on('close', (code) => {
    process.exit(code);
  });

  // Interrupt process flow in the parent
  process.once('uncaughtException', (e) => {});
  throw new Error('harmony');
};
