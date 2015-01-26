angular.module('Instagram')
  .controller('HomeCtrl', function($scope, $window, $rootScope, API) {

  	console.log('do we even reach this. wtf');
	  console.log($rootScope.loggedInUser);


  	API.getFeed().success(function(data) {
        console.log('...get feed');
		    console.log(data);
        $scope.photos = data;
        console.log(data);
    });


   $scope.isAuthenticated = function() {
    	if ($rootScope.loggedInUser){
	    	return true;
	    }else{
	    	return false;
	    }
    };



  });