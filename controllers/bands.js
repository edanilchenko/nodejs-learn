var BandModel = require('../mongoose').BandModel;
var BandModel = require('../models/bands').BandModel;

exports.index = function(req, res){
    BandModel.find({}, function(err, bands){
        if(!err){
            res.render('bands/band_list', {title:'Bands', bandsList: bands});
        }
        else{
            console.log(err);
        }
    });
}

exports.show = function(req, res){
    var id = req.params.bid;
    BandModel.find({bid:id}, function(err, band){
        if(!err){
            res.render('bands/band', {title:'Bands', band: band[0]});
        }
        else{
            console.log(err);
        }
    });
}

exports.addForm = function(req, res){
    res.render('bands/add_form');
};

exports.create = function(req, res){
    BandModel.find().sort({bid:-1}).findOne(function(err, band){
        var bid = band.bid + 1;
        var bandMembers = [];
        var members = req.body.members.split(',');
        for(var i = 0; i < members.length; i++){
            person = {
                name: members[i],
                aid:''
            };
            bandMembers.push(person);
        }
        var newBand = {
            bid: bid,
            name: req.body.band_name,
            state: req.body.band_state,
            members: bandMembers
        };
        var Band = new BandModel(newBand);
        Band.save(function(err, data){
            if(!err){
                console.log('Data was saved!');
                res.redirect('/bands/');
            }
            else{
                console.log(err);
            }
        });
    });
}

exports.deleteForm = function(req, res){
    var id = req.params.bid;
    BandModel.find({bid:id}, function(err, band){
        if(!err){
            res.render('bands/delete_form', {band: band[0]});
        }
        else{
            console.log(err);
        }
    });
}

exports.delete = function(req, res){
    var id = req.body.bid;
    BandModel.remove({bid:id}, function(err){
        if(!err){
            console.log('Group was deleted!');
        }
        else{
            console.log(err);
        }
    });
}

exports.editForm = function(req, res){
    var bid = req.params.bid;
    BandModel.find({bid:bid}, function(err, band){
        if(!err){
            var group = band[0];
            var persons = [];
            for(i=0; i < group.members.length; i++){
                persons.push(group.members[i].name);
            }
            res.render('bands/edit_form', {band: group, members: persons.join(',')});
        }
        else{
            console.log(err);
        }
    });
}

exports.edit = function(req, res){
    var bid = req.body.bid;
    var bandMembers = [];
    var members = req.body.members.split(',');
    members.forEach(function(item){
        person = {
            name: item,
            aid: ''
        }
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
            console.log('Data was saved');
            res.redirect('/bands/');
        }
        else{
            console.log(err);
        }
    });
}