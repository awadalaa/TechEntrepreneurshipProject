angular.module('Instagram', ['ngRoute', 'ngMessages','mgcrea.ngStrap'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/feed/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      })
      .otherwise('/');
  }).config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q, $window, $location) {
      return {
        request: function(config) {
          console.log('here');
          console.log($window.sessionStorage.token);
          if ($window.sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          }
          return config;
        },
        responseError: function(response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/login');
          }
          return $q.reject(response);
        }
      }
    })
  });

