var esTranspiler = require('broccoli-babel-transpiler');
var sourceMap = require('broccoli-source-map');
var Funnel = require('broccoli-funnel');
var Merge = require('broccoli-merge-trees');

var systemjs = Funnel('node_modules/es6-micro-loader/dist', {destDir: 'system'});
var srcTree = new Funnel('src');
var publicTree = new Funnel('public');

srcTree = esTranspiler(srcTree, {
  sourceMaps: 'inline',
  filterExtensions: ['es6'],
  modules: 'system',
});

srcTree = sourceMap.extract(srcTree),

module.exports = Merge([
  systemjs,
  srcTree,
  publicTree,
]);
