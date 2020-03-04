var MusicianModel = require('../models/musicians').MusicianModel;

exports.index = function(req, res){
    MusicianModel.find({}, function(err, musicians){
        if(!err){
            res.render('musicians/musician_list', {title: 'Musicians', bandsList: musicians});
        }
        else{
            console.log(err);
        }
    });
};

exports.show = function(req, res){
    var id = req.params.id;
    MusicianModel.find({mid:id}, function (err, musician){
        if(!err){
            res.render('musicians/musician', {title: 'Bands', musician: musician[0]});
        }
        else{
            console.log(err);
        }
    });
}

exports.addForm = function(req, res){
    res.render('musicians/add_form');
};

exports.create = function(req, res){
    MusicianModel.find().sort({mid:-1}).findOne(function(err, musician){
        var mid = (musician) ? musician.mid + 1 : 1;
        var newMusician = {
            mid: mid,
            name: req.body.name,
            bio: req.body.bio
        };
        var Musician = new MusicianModel(newMusician);
        Musician.save(function(err, data){
            if(!err){
                console.log('Data was saved!');
                res.redirect('/musicians/');
            }
            else{
                console.log(err);
            }
        });
    });
}

exports.deleteForm = function(req, res){
    var id = req.params.id;
    MusicianModel.find({mid:id}, function(err, musician){
        if(!err){
            res.render('musicians/delete_form', {musician: musician[0]});
        }
        else{
            console.log(err);
        }
    });
}

exports.delete = function(req, res){
    var id = req.body.mid;
    MusicianModel.remove({mid:id}, function(err){
        if(!err){
            console.log('Musician was deleted!');
            res.redirect('/musicians/');
        }
        else{
            console.log(err);
        }
    });
}

exports.editForm = function(req, res){
    var mid = req.params.id;
    MusicianModel.find({mid:mid}, function(err, musicians){
        if(!err){
            var musician = musicians[0];
            res.render('musicians/edit_form', {musician: musician});
        }
        else{
            console.log(err);
        }
    });
}

exports.edit = function(req, res){
    var mid = req.body.mid;
    var updateMusician = {
        mid: mid,
        name: req.body.name,
        bio: req.body.bio
    };
    MusicianModel.update({mid: mid}, updateMusician, function(err, data){
        if(!err){
            console.log('Data was saved');
            res.redirect('/musicians/');
        }
        else{
            console.log(err);
        }
    });
}