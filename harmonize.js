'use strict';

const cp = require('child_process');
const semver = require('semver');

// features we can safely look for, by version, to determine if the harmony
// flags have been applied. otherwise we're in an infinate child process loop.
const breakpoints = {
  get v4 () {
     return {
       flag: 'harmony_proxies',
       test: 'Proxy'
     };
  },
  get v5 () {
    return this.v4;
  },
  get v6 () {
    return {
      flag: 'harmony_array_prototype_values',
      test: 'Array.prototype.values'
    };
  },
  get v7 () {
    return this.v6;
  }
};
const version = semver(process.version).major;

module.exports = (features) => {

  let breakpoint = breakpoints['v' + version] || breakpoints.v4;

  features = features || ['harmony'];         // all the things by default
  features = features.concat(breakpoint.flag);
  features = Array.from(new Set(features));   // force uniqueness
  features = features.map((f) => '--' + f);   // prepend --

  // if our breakpoint / test feature is available, then don't spawn another
  // process. we're good to go.
  if (eval('typeof ' + breakpoint.test) !== 'undefined') {
    return;
  }

  let command = process.argv[0],
    script = process.argv.slice(1),
    params = features.concat(script),
    app = cp.spawn(command, params, { stdio: 'inherit' });

  app.on('close', (code) => {
    process.exit(code);
  });

  // Interrupt process flow in the parent
  process.once('uncaughtException', (e) => {});
  throw 'harmony';
};
