var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
    when('/animals', {
      templateUrl: '/views/partials/animals.html',
      controller: 'animalsController'
    }).
    when('/favorites', {
      templateUrl: '/views/partials/favorites.html',
      controller: 'favoritesController'
    }).
    when('/home', {
      templateUrl: '/views/partials/home.html',
      controller: 'homeController'
    }).
    otherwise({
      redirectTo: "/home"
    });
}]);
