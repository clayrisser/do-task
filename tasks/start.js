import pause from 'pause-async';

export default async function start() {
  await pause(1000);
  console.log('Hello, world!');
  await pause(1000);
}
