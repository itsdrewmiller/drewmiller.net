
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
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
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
app.use('/submodules', express.static(__dirname + '/submodules'));

app.use(app.router);

app.post('/bucky/v1/send', function(req, res) {
	// do something with req.text and ES here
	res.end();
});

app.get('/boomerang', function(req, res) {
	// do something with req.params and ES here
	res.end();
});

app.get('/api/blog', function(req, res) {
  // get all blog posts
  var page = parseInt(req.query.page);
  if (page < 1) { page = 1; }
  var perPage = 25;

  es.search({
    index: 'blog',
    type: 'post',
    from: 0,
    size: perPage
  }, function(err, posts) {
    res.send(posts);
  });
});

app.get('/api/blog/:postId', function(req, res) {
  // get one blog post
  es.get({
    index: 'blog',
    type: 'post',
    id: req.params.postId
  }, function(err, post) {
    res.send(post);
  });
});

app.post('/api/blog/:postId/comment', function(req, res) {
  // add a comment
  // looks like bonsai is currently refusing dynamic scripting
  // so might need some janky way of doing this
  // or maybe parent/child will cover it?
});

app.post('/api/blog', function(req, res) {
  res.send(401, 'Maybe we will allow this someday');
  // es.create({
  //   index: 'blog',
  //   type: 'post',
  //   body: req.body
  // });
});

app.all('/*', routes.index);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
