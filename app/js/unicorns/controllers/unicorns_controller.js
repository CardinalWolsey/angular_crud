module.exports = function(app) {
  app.controller('UnicornsController', ['$scope', '$http', 'cfResource', function($scope, $http, cfresource) {
    $scope.unicorns = [];
    $scope.newUnicorn = null;
    var unicornsResource = cfResource('unicorns')

    $scope.getAll = function() {
      unicornsResource.getAll(function(err, data) {
        if (err) return err;

        $scope.unicorns = data;
      });
    }

    $scope.create = function(unicorn) {
      unicornsResource.create(unicorn, function(err, data) {
        if (err) return err;
        $scope.unicorn.push(data);
        $scope.newUnicorn = angular.copy($scope.defaults);
      });
    };

    $scope.update = function(unicorn) {
      unicorn.editing = false;
      $http.put('/api/unicorns/' + unicorn._id, unicorn)
        .then(function(res) {
          console.log('this unicorn has a new identity (placed in unicorn witness protection');
        }, function(err) {
          $scope.errors.push('could not get unicorn: ' + unicorn.name + ' to unicorn trial');
          console.log(err.data);
        });
    };

    $scope.remove = function(unicorn) {
      $scope.unicorns.splice($scope.unicorns.indexOf(unicorn), 1);
      $http.delete('/api/unicorns/' + unicorn._id)
        .then(function(res) {
          console.log('oh no!  You murdered an Unicorn');
        }, function(err) {
          console.log(err.data);
          $scope.getAll();
        });
    };
  }]);
};
