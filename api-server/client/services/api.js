angular.module('Instagram')
    .factory('API', function($http) {

      return {
        getFeed: function() {
          return $http.get('/api/posts');
        },
        getMediaById: function(id) {
          return $http.get('/api/posts/' + id);
        },
        likePost: function(id) {
          return $http.post('/api/like', { mediaId: id });
        }
      }

    });
