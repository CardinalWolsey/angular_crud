var mongoose = require('mongoose');
var express = require('express');
var app = express();
var unicornsRouter = require(__dirname + '/routes/unicorns_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/unicorn_dev');

app.use(express.static(__dirname + '/build'));

app.use('/api', unicornsRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});
