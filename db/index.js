const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://mongo:27017');

const db = mongoose.connection;

autoIncrement.initialize(db);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('mongo db connected');
});

module.exports = { mongoose, autoIncrement };
