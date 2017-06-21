import 'babel-polyfill';
import _ from 'lodash';
import chalk from 'chalk';
import fs from 'fs-extra-promise';
import moment from 'moment';
import murmur from 'murmurhash3js';
import path from 'path';

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

export const run = (task, options) => {
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
