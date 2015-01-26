angular.module('Instagram')
  .controller('SignupCtrl', function($scope) {

    $scope.signup = function() {
      var user = {
        email: $scope.email,
        password: $scope.password
      };

      console.log(user);
      
    };

  });