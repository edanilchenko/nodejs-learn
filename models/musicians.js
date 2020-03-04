var mongoose = require('mongoose');
var db = require('../mongoose').db;

var MusicianSchema = new mongoose.Schema({
    mid: {type: Number, index: true, min: 1},
    name: {type: String, match: /[a-z ]/},
    birth: {type: Date},
    death: {type: Date},
    bio: {type: String},
    groups: [{bid: Number, name: String}]
});

MusicianSchema.statics.getLastBid = function(){
    var coll = this.find({}).sort({'mid': -1}).limit(1);
    console.log(coll.bid);
}

var MusicianModel = db.model('Musician', MusicianSchema);
module.exports.MusicianModel = MusicianModel;