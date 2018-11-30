var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testData');
var db = mongoose.connection;

router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname, "..", '/public/index.html'));
});

router.post('/', function (req, res, next) {
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
      income: 0,
      outcome: 0,

    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        console.log('Registered!');
        return res.redirect('localhost:8080/Profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        console.log("Logged In!");
        return res.redirect('localhost:8080/Profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})
router.get('/getUsername', function (req, res) {
  User.findById(req.session.userId)
  .exec(function (err, user){
    if (err) throw err;
    console.log("Data Collected ")
    console.log(user);
    return res.send(user);
//    return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
  })
});

router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        console.log("Logged Out")
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
