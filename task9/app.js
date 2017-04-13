let express = require('express');
let app = express();
let db = require('diskdb');
db.connect('./db', ['arrayOfArticales']);
let bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/articles", function (req, res) {
    res.json(db.arrayOfArticales.find());
})

app.get("/articles:id", function (req, res) {
    res.json(db.arrayOfArticales.findOne({ id: req.params.id }));
})

app.post("/articles", function (req, res) {
console.log(req.body);
    res.json(db.arrayOfArticales.save(req.body));
})

app.delete("/articles", function (req, res) {
    res.json(db.arrayOfArticales.remove({ id: req.body.id }));
});

app.delete("/articles:id", function (req, res) {
    res.json(db.arrayOfArticales.remove({ id: req.params.id }));
});

app.patch('/articles', function (req, res) {
  db.arrayOfArticales.remove({id:req.body.id});
  res.json(db.arrayOfArticales.save(req.body));
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});