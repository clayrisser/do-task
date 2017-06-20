export default async function start() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Hello, world!');
  await new Promise(resolve => setTimeout(resolve, 1000));
}
