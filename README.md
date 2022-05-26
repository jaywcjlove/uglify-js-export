uglify-js-export
===

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