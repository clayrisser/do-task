import { runTool } from '../src/toolz.js';
import clean from './clean';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

export default async function build() {
  await runTool(clean);
  return new Promise((resolve, reject) => {
    gulp.src(['./src/toolz.js'])
      // .pipe($.eslint())
      // .pipe($.eslint.format())
      // .pipe($.eslint.failAfterError())
      .pipe($.babel({
        presets: [
          ['es2015', { modules: false }],
          'stage-2',
          'node5'
        ],
        plugins: ['babel-plugin-transform-async-to-generator']
      }))
      .pipe(gulp.dest('./dist/'))
      .on('end', resolve).on('error', reject);
  });
}
