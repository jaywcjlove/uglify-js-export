const { minify } = require('../');

const code = `function Good(name) {
  return 'Hi!, ' + name
}`;

test('minify', () => {
  expect(typeof minify).toBe('function');
  expect(minify(code).code).toBe("function Good(n){return\"Hi!, \"+n}");
});