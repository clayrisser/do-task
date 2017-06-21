import clean from './clean';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { run } from '../src/do-task';

const $ = gulpLoadPlugins();

export default async function build() {
  await run(clean);
  await new Promise((resolve, reject) => {
    gulp.src(['./src/do-task.js'])
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
      .pipe($.uglify().on('error', reject))
      .pipe($.rename({
        basename: 'index',
        extname: '.js'
      }))
      .pipe(gulp.dest('./'))
      .on('end', resolve).on('error', reject);
  });
  await new Promise((resolve, reject) => {
    gulp.src(['./src/do-task-cli.js'])
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
      .pipe($.uglify().on('error', reject))
      .pipe($.rename({
        basename: 'do-task',
        extname: '.js'
      }))
      .pipe(gulp.dest('./bin/'))
      .on('end', resolve).on('error', reject);
  });
}
