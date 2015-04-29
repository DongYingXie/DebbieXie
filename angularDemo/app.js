var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'www')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/home.json', function(req, res) {
  fs.readFile('home.json', function(err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});
app.post('/home.json', function(req, res) {
  fs.readFile('home.json', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('home.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache');
      res.send({
        result: 'success'
      });
    });
  });
});
app.post('/login', function(req, res) {
  if (req.body.email == '490262872@qq.com' && req.body.password == 'debi') {
    res.send({
      result: 'admin'
    });
  } else if (req.body.email != '' && req.body.password != '') {
    res.send({
      result: 'true'
    });
  }
});
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});