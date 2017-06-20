import webpack from 'webpack';
import runTool from '../src/runTool.js';
import clean from './clean';
import webpackConfig from './webpack.config';

export default async function build() {
  await runTool(clean);
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) return reject(err);
      console.log(stats.toString(webpackConfig.stats));
      return resolve();
    });
  });
}
