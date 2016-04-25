(function(angular) {
  'use strict';
angular.module('app', ['ngComponentRouter', 'images'])

.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})

.value('$routerRootComponent', 'app')

.component('app', {
  template:
    '<nav>\n' +
    '  <a ng-link="[\'Images\']">Images</a>\n' +
    '</nav>\n' +
    '<ng-outlet></ng-outlet>\n',
  $routeConfig: [
    {path: '/images/...', name: 'Images', component: 'images' }
  ]
})
.controller('appController', ['$scope', '$filter', function ($scope, $filter) {
 $scope.currentPage = 0;
 $scope.pageSize = 10;
 $scope.data = [];
 $scope.q = '';
 
 $scope.getData = function () {
   return $filter('filter')($scope.data, $scope.q)
     var arr = [];
     if($scope.q == '') {
         arr = $scope.data;
     } else {
         for(var ea in $scope.data) {
             if($scope.data[ea].indexOf($scope.q) > -1) {
                 arr.push( $scope.data[ea] );
             }
         }
     }
     return arr;
 }
 
 $scope.numberOfPages=function(){
     return Math.ceil($scope.getData().length/$scope.pageSize);                
 }
 
 for (var i=0; i<65; i++) {
     $scope.data.push("Item "+i);
 }
}])
.filter('startFrom', function() {
 return function(input, start) {
	 if (!input || !input.length) { return; }
     start = +start; //parse to int
     return input.slice(start);
 }
});
})(window.angular);


