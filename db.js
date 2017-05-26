const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost/Valdis');

db.on('error', err => console.log('connection error to DB.', err.message));
db.once('open', callback => console.log('connected to DB'));

const articles = new mongoose.Schema({
    author: String,
    title: String,
    content: String,
    summary: String,
    img: String,
    createdAt: Date,
    tags: [String]
});

const users = new mongoose.Schema({
    username: String,
    password: String
});

module.exports.articles = db.model('articles', articles);
module.exports.users = db.model('users', users);
