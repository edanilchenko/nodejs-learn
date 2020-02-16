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

var BandModel = require('./mongoose').BandModel;

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
    BandModel.find(function (err, bands){
        if(!err){
            res.render('band_list', {title:'Bands', bandsList: bands});
        }
        else{
            console.log(err);
        }
    });
});
app.get('/bands/:bid?', function(req, res, next){
    var id = req.params.bid;
    console.log(id);
    BandModel.find({bid:id}, function(err, band){
        console.log(band);
        if(!err){
            res.render('band', {title:'Band',band:band[0]});
        }
        else{
            console.log(err);
        }
        next();
    });
});
app.get('/', function(req, res){
    res.render('index', {title:'Bands', textBody: 'Hello, MyExpress!!!'});
});

app.get('/add/', function(req, res){
    res.render('add_form');
});
app.post('/add/', function(req, res){
    BandModel.find().sort({bid:-1}).findOne(function(err, band){
        var bandMembers = [];
        var members = req.body.band_members.split(',');
        for(var i = 0; i < members.length; i++){
            person = {
                name: members[i],
                aid: ''
            };
            console.log(person);
            bandMembers.push(person);
        }
        var newBand = {
            bid: band.bid + 1,
            name: req.body.band_name,
            state: req.body.band_state,
            members: bandMembers
        };
        Band = new BandModel(newBand);
        Band.save(function(err, data){
            if(!err){
                console.log('Data saved!');
                BandModel.find({}, function (err, bands){
                    if(!err){
                        res.render('band_list', {title:'Bands', bandsList: bands});
                    }
                    else{
                        console.log(err);
                    }
                });
            }
            else{
                console.log(err);
            }
        })
    });
});

app.get('/edit/:bid?', function(req, res){
    var id = req.params.bid;
    BandModel.find({bid:id}, function(err, band){
        if(!err){
            var group = band[0];
            var persons = [];
            for(i=0; i<group.members.length; i++){
                persons.push(group.members[i].name);
            }
            res.render('edit_form', {band: group, members: persons.join(',')});
        }
        else{
            console.log(err);
        }
    });
});
app.put('/edit/:bid?', function(req, res){
    var bid = req.body.bid;
    var bandMembers = [];
    var members = req.body.members.split(',');
    members.forEach(function(item){
        person = {
            name: item,
            aid: ''
        };
        bandMembers.push(person);
    });
    var updateBand = {
        bid: bid,
        name: req.body.name,
        state: req.body.state,
        members: bandMembers
    };
    BandModel.update({bid: bid}, updateBand, function(err, data){
        if(!err){
            console.log('Data saved');
        }
        else{
            console.log(err);
        }
    });
});

app.get('/del/:bid?', function(req, res){
    var id = req.params.bid;
    BandModel.find({bid:id}, function(err, band){
        if(!err){
            res.render('delete_form', {band: band[0]});
        }
        else{
            console.log(err);
        }
    });
});
app.delete('/del/:name?', function(req, res){
    var id = req.body.bid;
    console.log(id);
    BandModel.remove({bid:id}, function(err){
        if(!err){
            console.log('Group deleted');
        }
        else{
            console.log(err);
        }
    });
});

app.listen(port);
console.log('Listening on port ' + port);