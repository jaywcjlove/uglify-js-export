const path = require('path');
const fs = require('fs');
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

test('minify 2', () => {
  const dirs = fs.readdirSync(path.resolve(process.cwd(), 'node_modules/uglify-js/lib/'));
  expect(dirs).toEqual(expect.arrayContaining(['ast.js', 'compress.js', 'minify.js', 'mozilla-ast.js', 'output.js', 'parse.js', 'propmangle.js', 'scope.js', 'sourcemap.js', 'transform.js', 'utils.js']));
  expect(fs.existsSync(path.resolve(process.cwd(), 'node_modules/uglify-js/tools/exports.js'))).toBeTruthy();
  expect(fs.existsSync(path.resolve(process.cwd(), 'node_modules/@types/uglify-js/index.d.ts'))).toBeTruthy();
});