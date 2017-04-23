var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PavoTD' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'PavoTD' });
});

router.get('/levelOne', function(req, res, next) {
  res.render('levelOne');
});

router.get('/levelTwo', function(req, res, next) {
  res.render('levelTwo');
});

router.get('/levelThree', function(req, res, next) {
  res.render('levelThree');
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

module.exports = router;
