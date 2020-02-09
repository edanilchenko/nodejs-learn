var express = require('express');
var path = require('path');
var stylus = require('stylus');
var app = express();
var port = process.env.PORT || 3000;
app.set('view engine', 'jade');
app.set('view options', {layout: true});
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(stylus.middleware(__dirname + '/public'));

var bands = ['Cure', 'Clash', 'Damned'];
app.get('/bands/:name?', function(req, res, next){
    var name = req.params.name;
    for(key in bands){
        if(bands[key] === name){
            res.render('band', {title:'Bands', name: name})
        }
    }
    next();
});

app.get('/bands/', function(req, res){
    res.render('band_list', {title:'Bands', bandsList: bands});
});

app.get('/bands/:name?', function(req, res){
    res.send('Unknown band!');
});

app.get('/', function(req, res){
    res.render('index', {title:'Bands', textBody: 'Hello, MyExpress!!!'});
});

app.listen(port);
console.log('Listening on port ' + port);