const t = require('babel-types');

module.exports = {
  CallExpression(path) {
    if (path.node.callee.name === '__autoinject' &&
        path.node.arguments.every(arg => t.isIdentifier(arg))
    ) {
      const injectables = path.node.arguments.map(arg => arg.name);
      path.replaceWith(t.callExpression(
        t.identifier('inject'),
        [t.arrowFunctionExpression(
          injectables.map(injectable => t.identifier(`_${injectable}_`)),
          t.blockStatement([
            t.expressionStatement(
              t.assignmentExpression(
                '=',
                t.objectPattern(injectables.map(injectable => t.objectProperty(t.identifier(injectable), t.identifier(injectable), false, true))),
                t.objectExpression(injectables.map(injectable => t.objectProperty(t.identifier(injectable), t.identifier(`_${injectable}_`))))
              )
            )
          ])
        )]
      ));
    }
  }
};
