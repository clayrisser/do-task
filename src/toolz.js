import moment from 'moment';
import chalk from 'chalk';
import murmur from 'murmurhash3js';
import path from 'path';
import _ from 'lodash';
import fs from 'fs-extra-promise';

const settings = {
  dateFormat: 'hh:mm:ss.sss',
  diffBy: 'milliseconds'
};

const bgColors = [
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan'
];

export const runTool = (task, options) => {
  const startTime = moment();
  if (typeof task.default !== 'undefined') task = task.default;
  started(task, startTime, options);
  return task(options).then((res) => {
    const finishTime = moment();
    finished(task, startTime, finishTime, options);
    return res;
  });
};

function started(task, startTime, options) {
  console.log(
    `[${startTime.format(settings.dateFormat)}] `
      + `${chalk.yellow('Started')} ${chalk[getTaskColor(task, true)](task.name)}`
      + (options ? ` (${options})` : '')
  );
}

function finished(task, startTime, finishTime, options) {
  const time = finishTime.diff(startTime, settings.diffBy);
  console.log(
    `[${finishTime.format(settings.dateFormat)}] `
      + `${chalk.green('Finished')} ${chalk[getTaskColor(task, true)](task.name)}`
      + (options ? ` (${options})` : '')
      + ` after ${time} ms`
  );
}

function getTaskColor(task, bg = false) {
  let hash = murmur.x86.hash32(task.name);
  hash = parseInt(hash / 6);
  if (bg) return bgColors[(hash - 3) % bgColors.length];
  return colors[hash % colors.length];
}

if (require.main === module) {
  const args = _.filter(process.argv, (arg) => {
    return arg[0] !== '-';
  });
  let command = args[args.length - 3];
  if (command.substr(command.length - 5) === 'toolz'
      || command.substr(command.length - 8) === 'toolz.js') {
    const task = require(path.resolve(`${projectPath()}/tools`, args[args.length - 1]));
    runTool(task).catch((err) => {
      console.error(err);
      process.exit(1);
    });
  } else {
    console.error('Please provide a valid task');
    process.exit(1);
  }
}

function projectPath() {
  let projectPath = '';
  let possiblePaths = _.remove(require.main.paths, (path) => {
    return fs.existsSync(path);
  });
  _.each(require.main.filename.substr(1, require.main.filename.length - 1).split('/'), (segment, i) => {
    possiblePaths = _.remove(possiblePaths, (path) => {
      return path.substr(1, path.length - 1).split('/')[i] === segment;
    });
    if (possiblePaths.length === 1) {
      projectPath = possiblePaths[0].substr(0, possiblePaths[0].indexOf('/node_modules'));
      return;
    }
  });
  return projectPath;
}
