myApp.controller('animalController', ['$scope', '$http', function ($scope, $http) {
  console.log('animalController');

  var key = '5c3c1a09b32292305d0d095f9675078f';
  var baseUrl = 'http://api.petfinder.com/';

  //set empty variable to store the random animal;
  $scope.pickAnimal = '';

  //create an array with all the animal choices with display and value;
  $scope.ranAnimals = [
    { type: '(select one)', value: '' },
    { type: 'barnyard', value: 'barnyard' },
    { type: 'bird', value: 'bird' },
    { type: 'cat', value: 'cat' },
    { type: 'dog', value: 'dog' },
    { type: 'horse', value: 'horse' },
    { type: 'pig', value: 'pig' },
    { type: 'reptile', value: 'reptile' },
    { type: 'smallfurry', value: 'smallfurry' },

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

//function that will take in info and put into a object that will be sent to the server;
  $scope.addFav =  function (animalId, animalType, description, image, name) {

    var favorite = {
      animalId: animalId,
      animalType: animalType,
      //used to limit the characters;
      description: description.substring(0, 100),
      image: image,
      name: name
    };
    console.log(favorite);

    $http({
      method: 'POST',
      url: '/favorites',
      data: favorite
    }).then(function (response) {
      console.log('POST works!');
    });
  };

}]);

//fav controller will house the get request: where the info will show on the app;
myApp.controller('favoritesController', ['$scope', '$http', function ($scope, $http) {
  console.log('favoritesController');

  $http({
    method: 'GET',
    url: '/favorites/favorite'
  }).then(function (response) {
    console.log('response object ', response);
    $scope.favorites = response.data;
    console.log('favorites ', $scope.favorites);
  });

}]);

//controller for the home screen; not sure if this is necessary..
myApp.controller('homeController', ['$scope', '$http', function ($scope, $http) {
  console.log('homeController');

}]);

//controller for the navbar; responsible for the critter count w/ diff GET request;
myApp.controller('navController', ['$scope', '$http', function ($scope, $http) {
  console.log('navController');

  // function count(){
    $http({
      method: 'GET',
      url: '/favorites/count'
    }).then(function (response) {
      console.log('response object ', response);
      $scope.count = response.data;
      console.log('count ', $scope.count[0].count);
    });
  // }

}]);
