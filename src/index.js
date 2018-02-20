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

export default function () {
  return {
    visitor: require('./visitor')
  };
};
