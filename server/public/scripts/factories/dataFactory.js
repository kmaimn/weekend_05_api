myApp.factory('DataFactory', ['$http', function($http){
//secret stuff;
var favCount = undefined;
var favAnimals = undefined;

//GET request to get count of animals in DB;
var updateCount = function (){
  var promise = $http.get('/favorites/count').then(function (response) {
    favCount = response.data;
    console.log('favCount is:', favCount);
  });
  console.log('promise is:', promise);
  return promise;
};

//get favorite animals from DB;
var getFavs = function () {
  console.log('DF getting favs from server');
  var favPromise = $http.get('/favorites/favorite').then(function (response) {
      console.log('DF response of fav animals: ', response);
      favAnimals = response.data;
    });
    return favPromise;
}

//post new favories to DB;
var addFav = function (favorite) {
  var addPromise = $http.post('/favorites', favorite).then(function(response){
    console.log('DF post complete!');
  });
  return addPromise;
}

//stuff to controllers;
return{
  counter: function (){
    return updateCount();
  },
  favorites: function (){
    return getFavs();
  },
  animalData: function(){
    return favCount;
  },
  favoriteData: function() {
    return favAnimals;
  },
  postFav: function(favorite){
    return addFav(favorite);
  }

}

}]);
