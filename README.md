<img src="https://img.shields.io/badge/license-MIT%20License-blue.svg">

# babel-plugin-transform-ng-autoinject

When writing tests for AngularJS 1.x ease the pain of writing enormous boilerplate like this:

```javascript
let $rootScope, $httpBackend
beforeEach(inject((_$rootScope_, _$httpBackend_) => {
  $rootScope = _$rootScope_;
  $httpBackend = _$httpBackend_;
}));
```

With the following syntax:

```javascript
let $rootScope, $httpBackend
beforeEach(__autoinject($rootScope, $httpBackend));
```

The plugin simply transforms the `__autoinject` expression into the former `inject(...)`

The exact form the plugin outputs the autoinject expression is:

```javascript
let $rootScope, $httpBackend
beforeEach(inject((_$rootScope_, _$httpBackend_) => {
  ({
    $rootScope,
    $httpBackend
  } = {
    $rootScope: _$rootScope_;
    $httpBackend: _$httpBackend_;
  });
}));
```
