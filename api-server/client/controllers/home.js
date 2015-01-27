angular.module('Instagram')
  .controller('HomeCtrl', function($scope, $window, $rootScope, API) {

  	API.getFeed().success(function(data) {
        $scope.photos = data;
    });

   $scope.isAuthenticated = function() {
    	if ($rootScope.loggedInUser){
	    	return true;
	    }else{
	    	return false;
	    }
    };

  });