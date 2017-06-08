var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var async = require('async');
var monk = require('monk');
var db = monk('localhost:27017/pavo_td');

/* GET home page. */
router.get('/', function(req, res, next) {
if (req.session && req.session.email) {
    var user_id = req.session.userId;
    var version = "1.0"
    async.parallel({
      maxCreditsL1: async.apply(getMaxCredits, 1, version, user_id),
      maxLivesL1: async.apply(getMaxLives, 1, version, user_id),
      maxCreditsL2: async.apply(getMaxCredits, 2, version, user_id),
      maxLivesL2: async.apply(getMaxLives, 2, version, user_id),
      maxCreditsL3: async.apply(getMaxCredits, 3, version, user_id),
      maxLivesL3: async.apply(getMaxLives, 3, version, user_id),
      maxTurretsL1: async.apply(getMaxMinTurrets, 1, version, -1, user_id),
      minTurretsL1: async.apply(getMaxMinTurrets, 1, version, 1, user_id),
      maxTurretsL2: async.apply(getMaxMinTurrets, 2, version, -1, user_id),
      minTurretsL2: async.apply(getMaxMinTurrets, 2, version, 1, user_id),
      maxTurretsL3: async.apply(getMaxMinTurrets, 3, version, -1, user_id),
      minTurretsL3: async.apply(getMaxMinTurrets, 3, version, 1, user_id),
      maxBombersL1: async.apply(getMaxMinBombers, 1, version, -1, user_id),
      minBombersL1: async.apply(getMaxMinBombers, 1, version, 1, user_id),
      maxBombersL2: async.apply(getMaxMinBombers, 2, version, -1, user_id),
      minBombersL2: async.apply(getMaxMinBombers, 2, version, 1, user_id),
      maxBombersL3: async.apply(getMaxMinBombers, 3, version, -1, user_id),
      minBombersL3: async.apply(getMaxMinBombers, 3, version, 1, user_id),
      maxIcersL1: async.apply(getMaxMinIcers, 1, version, -1, user_id),
      minIcersL1: async.apply(getMaxMinIcers, 1, version, 1, user_id),
      maxIcersL2: async.apply(getMaxMinIcers, 2, version, -1, user_id),
      minIcersL2: async.apply(getMaxMinIcers, 2, version, 1, user_id),
      maxIcersL3: async.apply(getMaxMinIcers, 3, version, -1, user_id),
      minIcersL3: async.apply(getMaxMinIcers, 3, version, 1, user_id)
    }, function(e, results) {
      if (e) {
        res.status(500).send(error);
      } else {
        console.log(results);
        res.render('index', {
          welcome: 'Welcome ' + req.session.email, 
          title: 'PavoTD',
          results: results
        });
      }
    });
  } else {
    console.log("no one logged in");
    res.render('index', { welcome: 'Welcome Guest', title: 'PavoTD', results: {}});
  }
});

router.get('/home', function(req, res, next) {
  if (req.session && req.session.email) {
    var user_id = req.session.userId;
    var version = "1.0"
    async.parallel({
      maxCreditsL1: async.apply(getMaxCredits, 1, version, user_id),
      maxLivesL1: async.apply(getMaxLives, 1, version, user_id),
      maxCreditsL2: async.apply(getMaxCredits, 2, version, user_id),
      maxLivesL2: async.apply(getMaxLives, 2, version, user_id),
      maxCreditsL3: async.apply(getMaxCredits, 3, version, user_id),
      maxLivesL3: async.apply(getMaxLives, 3, version, user_id),
      maxTurretsL1: async.apply(getMaxMinTurrets, 1, version, -1, user_id),
      minTurretsL1: async.apply(getMaxMinTurrets, 1, version, 1, user_id),
      maxTurretsL2: async.apply(getMaxMinTurrets, 2, version, -1, user_id),
      minTurretsL2: async.apply(getMaxMinTurrets, 2, version, 1, user_id),
      maxTurretsL3: async.apply(getMaxMinTurrets, 3, version, -1, user_id),
      minTurretsL3: async.apply(getMaxMinTurrets, 3, version, 1, user_id),
      maxBombersL1: async.apply(getMaxMinBombers, 1, version, -1, user_id),
      minBombersL1: async.apply(getMaxMinBombers, 1, version, 1, user_id),
      maxBombersL2: async.apply(getMaxMinBombers, 2, version, -1, user_id),
      minBombersL2: async.apply(getMaxMinBombers, 2, version, 1, user_id),
      maxBombersL3: async.apply(getMaxMinBombers, 3, version, -1, user_id),
      minBombersL3: async.apply(getMaxMinBombers, 3, version, 1, user_id),
      maxIcersL1: async.apply(getMaxMinIcers, 1, version, -1, user_id),
      minIcersL1: async.apply(getMaxMinIcers, 1, version, 1, user_id),
      maxIcersL2: async.apply(getMaxMinIcers, 2, version, -1, user_id),
      minIcersL2: async.apply(getMaxMinIcers, 2, version, 1, user_id),
      maxIcersL3: async.apply(getMaxMinIcers, 3, version, -1, user_id),
      minIcersL3: async.apply(getMaxMinIcers, 3, version, 1, user_id)
    }, function(e, results) {
      if (e) {
        res.status(500).send(error);
      } else {
        console.log(results);
        res.render('index', {
          welcome: 'Welcome ' + req.session.email, 
          title: 'PavoTD',
          results: results
        });
      }
    });
  } else {
    console.log("no one logged in");
    res.render('index', { welcome: 'Welcome Guest', title: 'PavoTD', results: {}});
  }
});

router.get('/leaderboards', function(req, res, next) {
  var version = "1.0";
  var user_id = {$ne: null};
  //async calls to get all mongo best results from separate functions
  async.parallel({
    maxCreditsL1: async.apply(getMaxCredits, 1, version, user_id),
    maxLivesL1: async.apply(getMaxLives, 1, version, user_id),
    maxCreditsL2: async.apply(getMaxCredits, 2, version, user_id),
    maxLivesL2: async.apply(getMaxLives, 2, version, user_id),
    maxCreditsL3: async.apply(getMaxCredits, 3, version, user_id),
    maxLivesL3: async.apply(getMaxLives, 3, version, user_id),
    maxTurretsL1: async.apply(getMaxMinTurrets, 1, version, -1, user_id),
    minTurretsL1: async.apply(getMaxMinTurrets, 1, version, 1, user_id),
    maxTurretsL2: async.apply(getMaxMinTurrets, 2, version, -1, user_id),
    minTurretsL2: async.apply(getMaxMinTurrets, 2, version, 1, user_id),
    maxTurretsL3: async.apply(getMaxMinTurrets, 3, version, -1, user_id),
    minTurretsL3: async.apply(getMaxMinTurrets, 3, version, 1, user_id),
    maxBombersL1: async.apply(getMaxMinBombers, 1, version, -1, user_id),
    minBombersL1: async.apply(getMaxMinBombers, 1, version, 1, user_id),
    maxBombersL2: async.apply(getMaxMinBombers, 2, version, -1, user_id),
    minBombersL2: async.apply(getMaxMinBombers, 2, version, 1, user_id),
    maxBombersL3: async.apply(getMaxMinBombers, 3, version, -1, user_id),
    minBombersL3: async.apply(getMaxMinBombers, 3, version, 1, user_id),
    maxIcersL1: async.apply(getMaxMinIcers, 1, version, -1, user_id),
    minIcersL1: async.apply(getMaxMinIcers, 1, version, 1, user_id),
    maxIcersL2: async.apply(getMaxMinIcers, 2, version, -1, user_id),
    minIcersL2: async.apply(getMaxMinIcers, 2, version, 1, user_id),
    maxIcersL3: async.apply(getMaxMinIcers, 3, version, -1, user_id),
    minIcersL3: async.apply(getMaxMinIcers, 3, version, 1, user_id)
    //maxLives: getMaxLives
  }, function(e, results) {
    if (e) {
      res.status(500).send(error);
    } else {
      console.log(results);
      res.render('leaderboards', {
        "results": results,
      });
    }
  });
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

//functions to get leaderboard results
function getMaxCredits(level, version, user_id, callback) {
  //var db = req.db;
  var completedLevels = db.get('completedLevels');
  completedLevels.find({level: level, gameVersion: version, creditsRemaining: {$gte: 0}, user_id: user_id}, 
    {limit: 1, sort: {creditsRemaining : -1}}, callback);
}

function getMaxLives(level, version, user_id, callback) {
  var completedLevels = db.get('completedLevels');
  completedLevels.find({level: level, gameVersion: version, livesRemaining: {$gte: 0}, user_id: user_id}, 
    {limit: 1, sort: {livesRemaining : -1}}, callback);
}

//maxOrMin should be -1 to return max, 1 to return min
function getMaxMinTurrets(level, version, maxOrMin, user_id, callback) {
  //var db = req.db;
  var completedLevels = db.get('completedLevels');
  completedLevels.find({level: level, gameVersion: version, 'towers.turrets': {$gte: 0}, user_id: user_id}, 
    {limit: 1, sort: {'towers.turrets' : maxOrMin}}, callback);
}

function getMaxMinIcers(level, version, maxOrMin, user_id, callback) {
  var completedLevels = db.get('completedLevels');
  completedLevels.find({level: level, gameVersion: version, 'towers.icers': {$gte: 0}, user_id: user_id}, 
    {limit: 1, sort: {'towers.icers': maxOrMin}}, callback);
}

function getMaxMinBombers(level, version, maxOrMin, user_id, callback) {
  var completedLevels = db.get('completedLevels');
  completedLevels.find({level: level, gameVersion: version, 'towers.bombers': {$gte: 0}, user_id: user_id}, 
    {limit: 1, sort: {'towers.bombers': maxOrMin}}, callback);
}

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

//handle save user data upon level completion
router.post('/levelCompleted', function(req, res, next) {
  var db = req.db;
  var completedLevels = db.get('completedLevels');
  var completedTime = Date.now();
  var postedData = JSON.parse(req.body.data)
  //all data being sent by us so no need to validate user inputs
  //check that user is logged in
  if (req.session.userId) {
    console.log(req.body);
    console.log(postedData);
    completedLevels.insert({
      user_id: req.session.userId,
      datetime: completedTime,
      level: postedData.level,
      difficulty: postedData.difficulty,
      gameVersion: postedData.gameVersion,
      livesRemaining: postedData.livesRemaining,
      towers: postedData.towers,
      creditsRemaining: postedData.creditsRemaining
    }, function(e, doc) {
      if (e) {
        console.warn(e.message);
      } else {
        res.json(doc);
      }
    });
  } else {
    res.send("No User logged in");
  }
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
