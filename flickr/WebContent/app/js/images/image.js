(function(angular) {
  'use strict';
angular.module('images', [])
  .service('imageService', ImageService)

  .component('images', {
    template: '<ng-outlet></ng-outlet>',
    $routeConfig: [
      {path: '/',    name: 'ImageList',   component: 'imageList', useAsDefault: true}
    ]
  })

  .component('imageList', {
	templateUrl:'app/js/images/imageList.html',
    controller: ImgaesListController
  });

function ImageService($q, $http) {

	this.getPhotos = function() {
	  return $http.get('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1');
  }
}

function ImgaesListController(imageService) {
  var $ctrl = this;

  this.$routerOnActivate = function(next) {
    // Load up the images for this view
	  imageService.getPhotos().then(function(images) {
      $ctrl.images = images.data.photos.photo;
    });
  };
}
})(window.angular);