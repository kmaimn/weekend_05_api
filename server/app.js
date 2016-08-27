var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.get('/*', function (req, res){
  //req.params[0] = because this is undefined, it points to index file;
  console.log(req.params);
  var file = req.params[0] || 'views/index.html';
  //any requests that pass through the server will start from app.js and then go into public!
  res.sendFile(path.join(__dirname, '/public', file));
});

app.listen(app.get('port'), function(){
  console.log('Listening on port: ', app.get('port'));
});
