myApp.controller('animalController', ['$scope', '$http', function ($scope, $http) {
  console.log('animalController');

  var key = '5c3c1a09b32292305d0d095f9675078f';
  var baseUrl = 'http://api.petfinder.com/';

  //set empty variable to store the random animal;
  $scope.pickAnimal = '';

  //create an array with all the animal choices with display and value;
  $scope.ranAnimals = [
    { type: '(select one)', value: '' },
    { type: 'Barn Animals', value: 'barnyard' },
    { type: 'Bird', value: 'bird' },
    { type: 'Cat', value: 'cat' },
    { type: 'Dog', value: 'dog' },
    { type: 'Horse', value: 'horse' },
    { type: 'Pig', value: 'pig' },
    { type: 'Reptile', value: 'reptile' },
    { type: 'Small & Furry', value: 'smallfurry' },

  ];
  //run the update fav count function;
  updateCount();

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
      description: description.substring(0, 99),
      image: image,
      name: name
    };
    console.log(favorite);

    $http({
      method: 'POST',
      url: '/favorites',
      data: favorite
    }).then(function (response) {
      //update count here, doesn't update count on POST... will console the correct amount...
      updateCount();
      console.log('POST works!');
    });
  };

  function updateCount(){
    $http({
      method: 'GET',
      url: '/favorites/count'
    }).then(function (response) {
      console.log('response object ', response);
      $scope.count = response.data;
      console.log('count 2', $scope.count[0].count);
    });
  }
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
