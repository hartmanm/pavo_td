var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session && req.session.email) {
    res.render('index', {welcome: 'Welcome ' + req.session.email})
  } else {
    res.render('index', { welcome: 'Welcome Guest' });
  }
});

router.get('/home', function(req, res, next) {
  if (req.session && req.session.email) {
    res.render('index', {welcome: 'Welcome ' + req.session.email})
  } else {
    res.render('index', { welcome: 'Welcome Guest' });
  }
});

router.get('/levelOne', function(req, res, next) {
  if (req.session && req.session.email) {
    res.render('levelOne', { welcome: 'Welcome ' + req.session.email})
  } else {
    res.render('levelOne', { welcome: 'Welcome Guest' });
  }
});

router.get('/levelTwo', function(req, res, next) {
  if (req.session && req.session.email) {
    res.render('levelTwo', { welcome: 'Welcome ' + req.session.email})
  } else {
    res.render('levelTwo', { welcome: 'Welcome Guest' });
  }
});

router.get('/levelThree', function(req, res, next) {
  if (req.session && req.session.email) {
    res.render('levelThree', { welcome: 'Welcome ' + req.session.email})
  } else {
    res.render('levelThree', { welcome: 'Welcome Guest' });
  }
});

router.get('/levelOneGame', function(req, res, next) {
  res.render('levelOneGame');
});

router.get('/levelTwoGame', function(req, res, next) {
  res.render('levelTwoGame');
});

router.get('/levelThreeGame', function(req, res, next) {
  res.render('levelThreeGame');
});

//load
router.get('/createUser', function(req, res, next) {
  var db = req.db;
  var users = db.get('users')
  users.find({},{}, function(e,docs) {
    console.log(docs)
    res.render('createUser', {
      "errors": [],
      "userList": docs
    });
  });
});

//Handle form submissions

router.post('/createUser', function(req, res, next) {
  var db = req.db;
  var users = db.get('users');
  //do some validation here
  req.checkBody("email", "Please make sure your emails match").equals(req.body.confirmEmail);
  req.checkBody("password", "Please make sure your passwords match").equals(req.body.confirmPassword);
  req.checkBody("email", "Please Enter a Valid Email Address").isEmail();
  req.checkBody("confirmEmail", "Please Enter a Valid Confirmation Email Address").isEmail();
  req.checkBody("password", "Please enter a valid password").notEmpty();
  req.checkBody("confirmPassword", "Please enter a valid confirmation password").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    users.find({},{}, function(e, docs){
      res.render('createUser', {"userList": docs, "errors": errors})
    });
  } else {
    users.insert({
    email: req.body.email,
    password: req.body.password
    }, function(e, docs) {
      if (e) {
        console.warn(e.message);
      } else {
        res.redirect('login');
      }
    });
  }
});

//Validate inputs and user credentials
router.post('/login', function(req, res, next) {
  //validate email is proper format
  req.checkBody("email", "Please Enter a Valid Email Address").isEmail();
  req.checkBody("password", "Please enter a valid password").notEmpty();
  var errors = req.validationErrors();
  console.log(req.body.email)
  console.log(req.body.password)

  var db = req.db;
  var users = db.get('users')

  //find user/password pair in database
  users.find({ email: req.body.email, password: req.body.password}, {}, function(e, user) {
    console.log(user)
    if (errors) {
      console.log(errors);
      res.render('login', {"errors": errors, "prompt": ""});
    } else if (user.length > 0) {
      //set session
      if (req.session) {
        req.session.reset();
      }
      console.log(user[0]["_id"]);
      req.session.userId = user[0]["_id"];
      req.session.email = user[0]["email"];
      console.log(user);
      res.redirect('home');
    } else {
      console.log("could not find user");
      res.render('login', {"errors": [], prompt: 'User not found or password incorrect'});
    }
  });
});

router.get('/login', function(req, res, next) {
  if (req.session) {
    req.session.reset();
  }
  res.render('login');
});

module.exports = router;
