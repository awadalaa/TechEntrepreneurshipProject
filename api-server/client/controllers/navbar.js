angular.module('Instagram')
  .controller('NavbarCtrl', function($scope, $rootScope, $window) {

    $scope.isAuthenticated = function() {
    	if ($rootScope.loggedInUser){
	    	return true;
	    }else{
	    	return false;
	    }
    };

    $scope.logout = function() {
      delete $window.localStorage.currentUser;
      $rootScope.loggedInUser=null;
    };

    $scope.currentUser = {};
	$scope.currentUser.username = $rootScope.loggedInUser
	$scope.currentUser.picture = './tests/face.png';
  });