"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@babel/core");

var _default = {
  CallExpression(path) {
    if (path.node.callee.name === '__autoinject' && path.node.arguments.every(arg => _core.types.isIdentifier(arg))) {
      const injectables = path.node.arguments.map(arg => arg.name);
      path.replaceWith(_core.types.callExpression(_core.types.identifier('inject'), [_core.types.arrowFunctionExpression(injectables.map(injectable => _core.types.identifier(`_${injectable}_`)), _core.types.blockStatement([_core.types.expressionStatement(_core.types.assignmentExpression('=', _core.types.objectPattern(injectables.map(injectable => _core.types.objectProperty(_core.types.identifier(injectable), _core.types.identifier(injectable), false, true))), _core.types.objectExpression(injectables.map(injectable => _core.types.objectProperty(_core.types.identifier(injectable), _core.types.identifier(`_${injectable}_`))))))]))]));
    }
  }

};
exports.default = _default;