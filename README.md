uglify-js-export
===

[![npm version](https://img.shields.io/npm/v/uglify-js-export?logo=npm)](https://www.npmjs.com/package/uglify-js-export)
[![npm version](https://img.shields.io/npm/v/uglify-js?logo=npm&label=uglify-js)](https://www.npmjs.com/package/uglify-js)
[![CI](https://github.com/jaywcjlove/uglify-js-export/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/uglify-js-export/actions/workflows/ci.yml)

[UglifyJS](https://github.com/mishoo/UglifyJS) is a JavaScript parser, minifier, compressor and beautifier toolkit.

A transform to make UglifyJS work in [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1).

## Installation

```bash
npm i uglify-js-export
```

```js
import UglifyJS from 'uglify-js-export';

const code = "function add(first, second) { return first + second; }";
const result = UglifyJS.minify(code);

console.log(result.error); // runtime error, or `undefined` if no error
console.log(result.code);  // minified output: function add(n,d){return n+d}
```

## License

Licensed under the MIT License.