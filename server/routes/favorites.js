var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/weekend_05';

router.get('/favorite', function (req, res) {

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM favorites ORDER BY animal_type ASC;', function (err, result) {
      done();

      if (err) {
        res.sendStatus(500);
      }

      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

router.get('/count', function (req, res) {

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT COUNT (*) FROM favorites;', function (err, result) {
      done();

      if (err) {
        res.sendStatus(500);
      }

      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

//post request;
router.post('/', function (req, res) {

  var favorite = req.body;
  console.log(favorite);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO favorites (animal_id, animal_type, description, image, name) ' +
        'VALUES ($1, $2, $3, $4, $5)', [favorite.animalId, favorite.animalType, favorite.description, favorite.image, favorite.name],
        function (err, result) {
          done();

          if (err) {
            res.sendStatus(500);
          }else {
            res.sendStatus(201);
          }
        });
    });

});

module.exports = router;
