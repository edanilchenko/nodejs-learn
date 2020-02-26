var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/bands');

db.on('error', function(err){
    console.log('Connection error: ', err.message);
});
db.once('open', function callback(){
    console.log('Connected to DB!');
});
module.exports.db = db;