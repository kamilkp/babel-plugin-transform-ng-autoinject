import * as babylon from 'babylon';
import traverse from '@babel/traverse';
import { types as t } from '@babel/core';
import generate from '@babel/generator';
import visitor from './src/visitor';

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

traverse(ast, visitor);

const gen = generate(ast, {
  // retainLines: true,
}, input);

console.log(gen.code);
