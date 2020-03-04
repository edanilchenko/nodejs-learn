var express = require('express');
var stylus = require('stylus');
//var routes = require('./routes');
var map = require('./approute');

var app = express();
var port = process.env.PORT || 8080;
var http = require('http');
var path = require('path');

app.configure(function(){
    app.set('view engine', 'jade');
    app.set('view option', { layout: true });
    app.set('views', __dirname + '/views');
    app.use(express.favicon());
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.errorHandler());
});

app.use(stylus.middleware({
    src: __dirname + '/views',
    dest: __dirname + '/public'
}));

app.use(function(req, res, next){
    throw new Error(req.url + ' not found');
});
app.use(function(err, req, res, next){
    console.log(err);
    res.send(err.message);
});

var controllers = ['bands', 'musicians'];
controllers.forEach(function(controller){
    map.route(app, controller);
});

http.createServer(app).listen(8080);
console.log('Express server listening on port 8080');