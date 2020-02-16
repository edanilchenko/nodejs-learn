var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/bands');
var BandSchema = new mongoose.Schema({
    bid: {type: Number, index: true, min: 1},
    name: {type: String, match: /[a-z0-9]/},
    state: {type: String, default: 'uk'},
    members: [{aid: Number, name: String}]
});

db.on('error', function(err){
    console.log('Connection error: ', err.message);
});
db.once('open', function callback(){
    console.log('Connected to DB!');
});
var BandModel = db.model('Band', BandSchema);
module.exports.BandModel = BandModel;