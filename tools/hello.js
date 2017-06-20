import world from '../test/world';
import { runTool } from '../src/toolz';

export default async function hello() {
  runTool(world);
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Hello,');
  return Promise.resolve();
};
