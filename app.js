
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var elasticsearch = require('elasticsearch');

var es = new elasticsearch.Client({
  host: process.env.BONSAI_URL,
  log: 'trace'
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));

app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk; });
    req.on('end', next);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/partials', express.static(__dirname + '/public/partials'));
app.use('/bower_components', express.static(__dirname + '/public/bower_components'));

app.use(app.router);

app.post('/bucky/v1/send', function(req, res) {
	// do something with req.text and ES here
	res.end();
});

app.get('/boomerang', function(req, res) {
	// do something with req.params and ES here
	res.end();
});

app.all('/*', routes.index);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
