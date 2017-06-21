import fs from 'fs-extra-promise';
import path from 'path';
import _ from 'lodash';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import projPath from 'proj-path';

const $ = gulpLoadPlugins();

export default async function clean() {
  const ignore = [
    'node_modules/'
  ];
  const files = await fs.readFileAsync(path.resolve(projPath(), '.gitignore')).then((file) => {
    const body = file.toString('utf8');
    return _.filter(body.replace(/\\/g, '').split('\n'), (line) => {
      return (line.length > 0 && line[0] !== '#' && !_.includes(ignore, line));
    });
  });
  await new Promise((resolve, reject) => {
    gulp.src(files, { read: false })
      .pipe($.clean()).on('finish', resolve);
  });
}
