
/**
 * Module dependencies.
 */
require('coffee-script')
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , gzippo = require('gzippo');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(gzippo.staticGzip(__dirname + '/public'));
  app.use(gzippo.compress());
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/:width([0-9]+)x:height([0-9]+)', routes.placehold)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
