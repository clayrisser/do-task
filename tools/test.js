import childProcess from 'child_process';

export default async function test() {
  await new Promise((resolve, reject) => {
    console.log('hi');
    childProcess.spawn('node ./node_modules/babel-cli/bin/babel-node ./dist/toolz.js run start', {
      stdio: 'inherit',
      shell: true
    }).on('close', resolve).on('error', reject);
  });
}
