
/**
 * Module dependencies.
 */
require('coffee-script')
var express = require('express')
  , params = require('express-params')
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
  params.extend(app);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

var dimensionRegex = /^[1-9]+\d{0,4}$/;
var color = /^[a-f0-9]{6}|[a-f0-9]{3}$/i;

app.param('size', dimensionRegex);
app.param('width', dimensionRegex);
app.param('height', dimensionRegex);
app.param('fgColor', color);
app.param('bgColor', color);

app.get('/:size', routes.placehold);
app.get('/:size/:bgColor', routes.placehold);
app.get('/:size/:bgColor/:fgColor', routes.placehold);
app.get('/(:width)x:height', routes.placehold);
app.get('/(:width)x:height/:bgColor', routes.placehold);
app.get('/(:width)x:height/:bgColor/:fgColor', routes.placehold);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
