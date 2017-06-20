export default async function world() {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('world!');
  return Promise.resolve();
};
