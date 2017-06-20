import fs from 'fs-extra-promise';
import childProcess from 'child_process';
import { runTool } from '../src/toolz';
import build from './build';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

export default async function publish() {
  await runTool(build);
  fs.copySync('./dist/toolz.js', './index.js');
  await new Promise((resolve, reject) => {
    gulp.src('./package.json')
      .pipe($.bump())
      .pipe(gulp.dest('./'))
      .on('error', reject).on('finish', resolve);
  });
}
