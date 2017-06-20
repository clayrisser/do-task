import fs from 'fs-extra-promise';
import childProcess from 'child_process';

export default async function publish() {
  return new Promise((resolve, reject) => {
    childProcess.spawn('npm publish', {
      stdio: 'inherit',
      shell: true
    }).on('close', resolve).on('error', reject);
  });
}
