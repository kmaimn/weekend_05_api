myApp.controller('animalController', ['$scope', '$http', function ($scope, $http) {
  console.log('animalController');

  var key = '5c3c1a09b32292305d0d095f9675078f';
  var baseUrl = 'http://api.petfinder.com/';

  //set empty variable to store the random animal;
  $scope.pickAnimal = '';

  //create an array with all the animal choices;
  $scope.ranAnimals = [
    { type: '(select one)' },
    { type: 'barnyard' },
    { type: 'bird' },
    { type: 'cat' },
    { type: 'dog' },
    { type: 'horse' },
    { type: 'pig' },
    { type: 'reptile' },
    { type: 'smallfurry' },

  ];

  //define function that will include random animal choice and query items;
  $scope.ranAn = function () {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + $scope.pickAnimal;
    query += '&output=basic';
    query += '&format=json';

    var request = baseUrl + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    //api call;
    $http.jsonp(request).then(
        function (response) {
            console.log(response.data);
            $scope.animal = response.data.petfinder.pet;
          });
  };
}]);

myApp.controller('favoritesController', ['$scope', '$http', function ($scope, $http) {
  console.log('favoritesController');

}]);

//controller for the home screen;
myApp.controller('homeController', ['$scope', '$http', function ($scope, $http) {
  console.log('homeController');

}]);
