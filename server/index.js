const express = require('express'),  
      logger = require('morgan'),
      config = require('./config'),
      path = require('path'),
      router = require('./router');


app = express();

app.use(logger('dev'));

//handle CORS
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// app.use(express.static(path.join(__dirname, '../build')));

app.use('/', router);

const server = app.listen(config.port);
console.log("server running on port: " + config.port);