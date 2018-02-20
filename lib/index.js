"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _visitor = _interopRequireDefault(require("./visitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * babel-plugin-transform-ng-autoinject
 * Author: Kamil Pękala (kamilkp@gmail.com)
 *
 * When writing tests for AngularJS 1.x ease the pain of writing enormous boilerplate like this:
 *
 * let $rootScope, $httpBackend
 * beforeEach(inject((_$rootScope_, _$httpBackend_) => {
 *   $rootScope = _$rootScope_;
 *   $httpBackend = _$httpBackend_;
 * }));
 *
 * With the following syntax:
 * let $rootScope, $httpBackend
 * beforeEach(__autoinject($rootScope, $httpBackend));
 *
 * The plugin simply transforms the __autoinject expression into the former inject(...)
 */
function _default() {
  return {
    visitor: _visitor.default
  };
}

;