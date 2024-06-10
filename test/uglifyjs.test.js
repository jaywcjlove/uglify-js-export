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

test('minify: mangle properties', () => {
const code = `var x = {
    baz_: 0,
    foo_: 1,
    calc: function() {
        return this.foo_ + this.baz_;
    }
};
x.bar_ = 2;
x["baz_"] = 3;
console.log(x.calc());`;
  expect(minify(code, { mangle: { properties: true } }).code).toBe("var x={o:0,a:1,c:function(){return this.a+this.o},n:2};x.o=3,console.log(x.c());");
  expect(minify(code, { mangle: { properties: {reserved: ["foo_", "bar_"]} } }).code).toBe("var x={o:0,foo_:1,a:function(){return this.foo_+this.o},bar_:2};x.o=3,console.log(x.a());");
});


test('minify: --mangle-props keep_quoted -c -m', () => {
const code = `var o = {
  "foo": 1,
  bar: 3,
};
o.foo += o.bar;
console.log(o.foo);`;
    expect(minify(code, {
      mangle: { properties: { keep_quoted: true } },
      compress: { }
    }).code).toBe("var o={foo:1,o:3};o.foo+=o.o,console.log(o.foo);");
});



test('minify: toplevel: true', () => {
  var code = {
      "file1.js": "function add(first, second) { return first + second; }",
      "file2.js": "console.log(add(1 + 2, 3 + 4));"
  };
      expect(minify(code, {
        toplevel: true
      }).code).toBe("console.log(10);");

      expect(minify(code, {
        toplevel: true,
        compress: {
            global_defs: {
                "@console.log": "alert"
            },
            passes: 2
        },
        output: {
            beautify: false,
            preamble: "/* uglified */"
        }
      }).code).toBe("/* uglified */\nalert(10);");
});


test('minify: 1', () => {
  var code = `var globalVar;
function funcName(firstLongName, anotherLongName) {
    var myVariable = firstLongName +  anotherLongName;
}`;
    expect(minify(code).code).toBe("var globalVar;function funcName(a,n){}");
    expect(minify(code, {
      mangle: { reserved: ['firstLongName'] }
    }).code).toBe("var globalVar;function funcName(firstLongName,a){}");

    expect(minify(code, {
      mangle: { toplevel: true }
    }).code).toBe("var n;function a(n,a){}");
});



test('minify: global_defs', () => {
  var code = `alert('hello');`;
    expect(minify(code, {
      compress: {
        global_defs: {
            "@alert": "console.log"
        }
      }
    }).code).toBe(`console.log("hello");`);
});

