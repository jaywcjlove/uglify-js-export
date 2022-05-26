var fs = require("fs");
var path = require("path");

const FILES = [
  require.resolve("./node_modules/uglify-js/lib/utils.js"),
  require.resolve("./node_modules/uglify-js/lib/ast.js"),
  require.resolve("./node_modules/uglify-js/lib/transform.js"),
  require.resolve("./node_modules/uglify-js/lib/parse.js"),
  require.resolve("./node_modules/uglify-js/lib/scope.js"),
  require.resolve("./node_modules/uglify-js/lib/compress.js"),
  require.resolve("./node_modules/uglify-js/lib/output.js"),
  require.resolve("./node_modules/uglify-js/lib/sourcemap.js"),
  require.resolve("./node_modules/uglify-js/lib/mozilla-ast.js"),
  require.resolve("./node_modules/uglify-js/lib/propmangle.js"),
  require.resolve("./node_modules/uglify-js/lib/minify.js"),
  require.resolve("./node_modules/uglify-js/tools/exports.js"),
];

const TYPE = require.resolve("./node_modules/@types/uglify-js/index.d.ts")

var code = FILES.map(function(file) {
  return fs.readFileSync(file, "utf8");
});

fs.writeFileSync(path.resolve(process.cwd(), 'lib/uglifyjs.js'), code.join("\n\n"));

console.log(`\n\n  Created\x1b[32;1m lib/uglifyjs.js\x1b[0m File.`);

var typecode = fs.readFileSync(TYPE, "utf8");

fs.writeFileSync(path.resolve(process.cwd(), 'index.d.ts'), typecode);

console.log(`  Created\x1b[32;1m index.d.ts\x1b[0m File.\n\n`)