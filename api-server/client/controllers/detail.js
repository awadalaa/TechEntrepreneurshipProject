angular.module('Instagram')
  .controller('DetailCtrl', function($scope, $rootScope, $location, API) {
    console.log('here i am in the details');
    var mediaId = $location.path().split('/').pop();

    API.getMediaById(mediaId).success(function(media) {
      console.log('media');
      console.log(media);
      $scope.photo = media.post;
      $scope.hasLiked = media.user_has_liked;
    });

    $scope.like = function() {
      $scope.hasLiked = true;
      API.likeMedia(mediaId).error(function(data) {
        sweetAlert('Error', data.message, 'error');
      });
    };
  });