myApp.factory('DataFactory', ['$http', function($http){
//secret stuff;
var favCount = undefined;

var updateCount = function (){
  console.log('DF getting count from server');
  var promise = $http.get('/favorites/count').then(function (response){
    favCount = response.data;
    console.log('favCount is:', favCount);
  });
  console.log('promise is:', promise);
  return promise;
};



//stuff to controllers;
return{
  animalData: function() {
    return favCount;
  },

  counter: function (){
    return updateCount();
  }
}

}]);
