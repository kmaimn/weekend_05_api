var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/weekend_05';

router.get('/', function(req, res){

  pg.connect(connectionString, function (err, client, done){
    if (err){
      res.sendStatus(500);
    }

    client.query('SELECT * FROM favorites ORDER BY animal_type ASC;', function (err, result){
      done();

      if (err){
        res.sendStatus(500);
      }
      console.log(results.rows);
      res.send(results.rows);
    });
  });
});

//started post request;
// router.post('/', function (req, res){
//   pg.connect(connectionString, function (err, client, done){
//     if(err){
//       res.sendStatus(500);
//     }
//   })
// })

module.exports = router;
