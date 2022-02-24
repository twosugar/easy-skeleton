export { default as openBrowser } from './openBrowser'
export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop3');
  }
  return a + b;
};
