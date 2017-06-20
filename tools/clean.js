import fs from 'fs-extra-promise';
import path from 'path';
import _ from 'lodash';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

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

export default async function clean() {
  const ignore = [
    'node_modules/'
  ];
  const files = await fs.readFileAsync(path.resolve(projectPath(), '.gitignore')).then((file) => {
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
