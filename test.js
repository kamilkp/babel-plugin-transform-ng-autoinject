const babylon      = require('babylon');
const traverse     = require('babel-traverse').default;
const t            = require('babel-types');
const generate     = require('babel-generator').default;

const input = `function test() {
  __autoinject($rootScope, $httpBackend);
}`;

const output = `function test() {
  inject((_$rootScope_, _$httpBackend_) => {
    ({ $rootScope, $httpBackend } = { $rootScope: _$rootScope_, $httpBackend: _$httpBackend_ });
  });
}`;

const ast = babylon.parse(input);

function ast2str(ast) {
  return JSON.stringify(ast.program.body, (key, value) => {
    if (key === 'loc' || key === 'start' || key === 'end') {
      return undefined;
    }

    return value;
  }, '  ');
}

traverse(ast, require('./visitor'));

const gen = generate(ast, {
  // retainLines: true,
}, input);

console.log(gen.code);
