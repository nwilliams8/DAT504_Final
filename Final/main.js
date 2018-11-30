var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//connect to MongoDB
mongoose.connect('mongodb://localhost/testData');
var db = mongoose.connection;

//handle error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // connected
});

//sessions track logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/build'));
//app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/public/index.html')));
// routes
var routes = require('./routes/router');
app.use('/', routes);
app.use('/profile', routes)

// error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});



app.listen(8080, function () {
  console.log('Express app listening on port 8080');
})
