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

//POST ... test not passing for unknown reason
    it('should be able to create a new unicorn', function() {
      $httpBackend.expectPOST('/api/unicorns', {name: 'test unicorn'}).respond(200, {name: 'a different unicorn'});
      expect($scope.unicorns.length).toBe(0);
      expect($scope.newUnicorn).toBe(null);
      $scope.newUnicorn.name = 'test unicorn';
      $scope.create($scope.newUnicorn);
      $httpBackend.flush();
      // expect($scope.newUnicorn).toBe(null);
      expect($scope.unicorns[0].name).toBe('a different unicorn');
    });

//PUT
    it('should be able to update a unicorn', function() {
      $httpBackend.expectPUT('/api/unicorns/456').respond(200, 'successfully updated');
      $scope.unicorns = [
        {name: 'unicornOne'},
        {name: 'unicornTwo', _id: '456'},
        {name: 'unicornThree'}
      ];
      $scope.edit($scope.unicorns[1]);
      expect($scope.unicorns[1].name).toBe('unicornThree');
      expect($scope.editing).toBe(true);
      expect($scope.newUnicorn.name).toBe('unicornTwo');
      $scope.newUnicorn.name = 'unicornEdit';
      $scope.submitEdit($scope.newUnicorn);
      $httpBackend.flush();
      expect($scope.Unicorns[2].name).toBe('unicornEdit');
    });

//DELETE ... tests not passing for some unknown reasion
    it('should be able to delete a unicorn', function() {
      $httpBackend.expectDelete('/api/unicorns/123').respond(200);
      $scope.unicorns[0] = {
        _id: 123,
        name: 'test unicorn'
      };
      $scope.unicorns[1] = {name: 'otherUnicorn'};
      $scope.remove($scope.unicorns[0]);
      $httpBackend.flush();
      expect($scope.unicorns[0].name).toBe('otherUnicorn');
    });

  });
});
