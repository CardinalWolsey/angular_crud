module.exports = function(app) {
  app.controller('UnicornsController', ['$scope', '$http', function($scope, $http) {
    $scope.unicorns = [];
    $scope.editing = false;

    $scope.getAll = function() {
      $http.get('/api/unicorns')
        .then(function(res) {
          $scope.unicorns = res.data;
        }, function(err) {
          console.log(err.data);
        });
    }

    $scope.create = function(unicorn) {
      $http.post('/api/unicorns', unicorn)
        .then(function(res) {
          $scope.unicorns.push(res.data);
          $scope.newUnicorn = {};
        }, function(err) {
          console.log(err.data);
        });
    };

    // $scope.update = function(unicorn) {
    //   unicorn.editing = false;
    //   $http.put('/api/unicorns/' + unicorn._id, unicorn)
    //     .then(function(res) {
    //       console.log('this unicorn has a new identity (placed in unicorn witness protection');
    //     }, function(err) {
    //       $scope.errors.push('could not get unicorn: ' + unicorn.name + ' to unicorn trial');
    //       console.log(err.data);
    //     });
    // };

    $scope.edit = function(unicorn) {
      $scope.unicorns.splice($scope.unicorns.indexOf(unicorn), 1);
      $scope.editing = true;
      $scope.tempUnicorn = angular.copy(unicorn);
      $scope.newUnicorn = unicorn;
      // $scope.orig.name = unicorn.name;
      // $scope.orig.color = unicorn.color;
      // $scope.orig.species = unicorn.species;
      // unicorn.editing = true;
      // console.log('Edit saved.');
    };

    $scope.cancelEdit = function() {
      $scope.editing = false;
      $scope.newUnicorn = {};
      $scope.unicorns.push($scope.tempUnicorn);
      // unicorn.name = $scope.orig.name;
      // unicorn.color = $scope.orig.color;
      // unicorn.species = $scope.orig.species;
      // unicorn.editing = false;
      // console.log('Edit cancelled.');
    };

    $scope.submitEdit = function(unicorn) {
      $scope.editing = false;
      $scope.unicorns.push(unicorn);
      $scope.newUnicorn = {};
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
