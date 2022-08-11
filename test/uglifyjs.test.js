const { minify } = require('../');

const code = `function Good(name) {
  return 'Hi!, ' + name
}`;

test('minify', () => {
  expect(typeof minify).toBe('function');
  expect(minify(code).code).toBe("function Good(n){return\"Hi!, \"+n}");
});

const code2 = `function Good(name) {
  var ab = 'good.'
  return 'Hi!, ' + name + ab
}`;

test('minify 2', () => {
  expect(minify(code2).code).toBe("function Good(o){return\"Hi!, \"+o+\"good.\"}");
});

const code3 = `function Good(name) {
  var ab = 'good.'
  return 'Hi!, ' + name + ab
}`;

test('minify 3', () => {
  expect(minify(code3, { compress: { unused: false }}).code).toBe("function Good(o){var n;return\"Hi!, \"+o+\"good.\"}");
});
