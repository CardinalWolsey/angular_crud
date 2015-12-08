require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('unicorn controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('UnicornApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('UnicornsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.unicorns)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('UnicornsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to unicorns with a Get all', function() {
      $httpBackend.expectGET('/api/unicorns').respond(200, [{_id: 1, name: 'test unicorn'}]);
      //write test to make sure errors are getting populated
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.unicorns[0].name).toBe('test unicorn');
    });

    it('should be able to create a new unicorn', function() {
      $httpBackend.expectPOST('/api/unicorns', {name: 'test unicorn', color: 'rainbow', species: 'awesome'}).respond(200, {name: 'a different unicorn'});
      expect($scope.unicorns.length).toBe(0);
      // expect($scope.newUnicorn).toEqual($scope.defaults);
      $scope.newUnicorn.name = 'test unicorn';
      $scope.create($scope.newUnicorn);
      $httpBackend.flush();
      expect($scope.unicorns[0].name).toBe('a different unicorn');
      // expect($scope.newUnicorn).toEqual($scope.defaults);
      // see online code for augular.copy deal
    });
  });
});
