var mongoose = require('mongoose');
var express = require('express');
var app = express();
var fs = require('fs');
var unicornsRouter = require(__dirname + '/routes/unicorns_routes');

app.get('/:filename', function(req, res, next) {
  fs.stat(__dirname + '/build/' + req.params.filename, function(err, status) {
    if (err) {
      console.log(err);
      return next();
    }

    if(!stats.isFile()) return next();

    var file = fs.createReadStream(__dirname + '/build/' + req.params.filename);
    file.pipe(res);
  });
});

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});
