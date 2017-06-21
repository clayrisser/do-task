import delay from 'delay';

export default async function start() {
  await delay(1000);
  console.log('Hello, world!');
  await delay(1000);
}
