import minimist from 'minimist';
import Err from 'err';
import _ from 'lodash';
import path from 'path';
import projPath from 'proj-path';
import fs from 'fs-extra-promise';

let run = () => {};
if (fs.existsSync('./do-task.js')) {
  run = require(path.resolve(__dirname, './do-task')).run;
} else {
  run = require(path.resolve(__dirname, '../index')).run;
}

const main = async () => {
  const args = minimist(process.argv);
  let progIndex = _.findIndex(args._, arg => arg === module.filename);
  if (progIndex < 0) {
    progIndex = _.findIndex(args._, arg => arg === module.filename.substr(0, module.filename.length - 3));
  }
  let command = '';
  if (progIndex >= 0 && args._.length > progIndex) {
    command = args._[_.findIndex(args._, (arg) => {
      return arg === module.filename.substr(0, module.filename.length - 3);
    }) + 1];
  } else {
    throw new Err('Missing command', 400);
  }
  switch (command) {
  case 'run':
    const taskNames = args._.slice(progIndex + 2);
    if (args.sync) {
      const promises = [];
      _.each(taskNames, (taskName) => {
        const task = require(path.resolve(`${projPath()}/tools`, taskName));
        promises.push(run.bind(this, task));
      });
      let promiseChain = Promise.resolve();
      _.each(promises, (promise) => {
        promiseChain = promiseChain.then(promise);
      });
      return promiseChain;
    } else {
      const promises = _.map(taskNames, (taskName) => {
        const task = require(path.resolve(`${projPath()}/tools`, taskName));
        return run(task);
      });
      return Promise.all(promises);
    }
  default:
    throw new Err('Invalid command', 400);
  }
};
main().catch((err) => {
  if (err.code >= 400 && err.code < 500) {
    console.warn(err.message);
  } else {
    console.error(err);
  }
  process.exit(1);
});
