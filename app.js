const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./db.js').users;
const Articles = require('./db.js').articles;
const session = require('express-session');
const sessionStore = require('connect-mongo')(session);
const store = new sessionStore({url: 'mongodb://localhost/Valdis'});
const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/filtered_articles', (req, res) => {
    Articles.find(req.body.filter).exec((err, data) => {
        data.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        const articles = data.slice(req.body.skip, req.body.top);
        res.json(articles);
    });
});

app.get('/articles:id', (req, res) => {
    Articles.findById(req.params.id,
        (err, data) => !err ? res.json(data) : res.sendStatus(500));
});

app.post('/articles', (req, res) => {
    new Articles(req.body).save(
        err => !err ? res.sendStatus(200) : res.sendStatus(500));
});

app.delete('/articles:id', (req, res) => {
    Articles.findByIdAndRemove(req.params.id,
        err => !err ? res.sendStatus(200) : res.sendStatus(500));
});

app.patch('/articles', (req, res) => {
    Articles.findByIdAndUpdate(req.body.id, {$set: req.body},
        err => !err ? res.sendStatus(200) : res.sendStatus(500));
});

/* PASSPORT */

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => {
    const error = user ? null : new Error('deserialize');
    done(error, user);
});

passport.use('login', new LocalStrategy({passReqToCallback: true},
    (req, username, password, done) => {
        Users.findOne({username}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log(`User Not Found with username ${username}`);
                return done(null, false, {message: 'user not found'});
            }
            if (password !== user.password) {
                console.log('Invalid Password');
                return done(null, false, {message: 'incorrect password'});
            }
            done(null, user);
        });
    }));

app.post('/login', passport.authenticate('login'), (req, res) => res.send(req.user.username));

app.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

app.get('/username', (req, res) => req.user ? res.send(req.user.username) : res.sendStatus(401));

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

