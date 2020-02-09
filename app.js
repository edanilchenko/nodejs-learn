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

app.use(express.favicon());
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

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

app.get('/add/', function(req, res){
    res.render('add_form');
});
app.post('/add/', function(req, res){
    bands.push(req.body.band_name);
    res.render('band_list', {title: 'Bands', bandsList: bands});
});

app.get('/edit/:name?', function(req, res){
    res.render('edit_form', {name: req.params.name});
});
app.put('/edit/:name?', function(req, res){
    var name = req.body.name;
    console.log(req.params);
    for(key in bands){
        if(bands[key] === name){
            console.log('aaaaaaa');
            bands[key] = req.body.newName;
        }
    }
    res.render('band_list', {title: 'Bands', bandsList: bands});
});

app.get('/del/:name?', function(req, res){
    res.render('delete_form', {name: req.params.name})
});
app.delete('/del/:name?', function(req, res){
    var name= req.params.name;
    for(key in bands){
        if(bands[key] === name){
            delete bands[key];
        }
    }
    res.render('band_list', {title:'Bands', bandsList: bands});
});

app.listen(port);
console.log('Listening on port ' + port);