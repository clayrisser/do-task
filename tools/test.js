import childProcess from 'child_process';

export default async function test() {
  await new Promise((resolve, reject) => {
    childProcess.exec('node ./node_modules/babel-cli/bin/babel-node ./dist/toolz.js start', (err, stdout, stderr) => {
      if (err) return reject(err);
      if (stderr) return reject(stderr);
      console.log(stdout);
      return resolve(stdout);
    });
  });
}
