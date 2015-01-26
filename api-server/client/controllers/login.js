angular.module('Instagram')
  .controller('LoginCtrl', function($scope, $alert, $http,$window, $location, $rootScope) {
    $scope.emailLogin = function() {
      var oauthObj = { username: $scope.email
                      ,password: $scope.password
                      ,client_id: 'mobile_ios_client'
                      ,client_secret: 'secretsaucebaby',
                      grant_type:'password'
                     };
      $http({method: 'POST'
            ,url: '/oauth/token/'
            ,headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            ,transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: oauthObj
      }).success(function (data, status, headers, config) {
            console.log('status',status);
            console.log('data',data);
          $window.sessionStorage.token = data.access_token;
          $alert({
            //title: 'Cheers!',
            content: 'You were successfully logged in!',
            placement: 'top-right',
            type: 'success',
            duration: 3
          });
            $rootScope.loggedInUser = $scope.email;
            $location.path("/");
        })
        .error(function (data, status, headers, config) {
          // Erase the token if the user fails to log in
          delete $window.sessionStorage.token;

          // Handle login errors here
          $scope.message = 'Error: Invalid user or password';
          $alert({
            content: 'Invalid username or password',
            placement: 'top-right',
            type: 'error',
            duration: 3
          });
        });  
    };

  });