var express = require('express');
var router = express.Router();
var fs = require("fs");
var dailyJSON = require('jsonfile');
var random = require('random-js')();

var dailyYes = JSON.parse(fs.readFileSync('public/JSON/dailyRewards.json', 'utf8'));
var dailyNo = JSON.parse(fs.readFileSync('public/JSON/dailyPenalty.json', 'utf8'));
var weeklyYes = JSON.parse(fs.readFileSync('public/JSON/weeklyRewards.json', 'utf8'));
var weeklyNo = JSON.parse(fs.readFileSync('public/JSON/weeklyPenalty.json', 'utf8'));

var yesDayValue = random.integer(1, 7);
var noDayValue = random.integer(1, 8);
var yesWeekValue = random.integer(1, 22);
var noWeekValue = random.integer(1, 6);

// console.log(dailyYes.length);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* GET social page. */
router.get('/social', function(req, res, next) {
	res.redirect('items');
});
/* GET budget page. */
router.get('/budget', function(req, res, next) {
  res.render('budget');
});
/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
/* GET setting page. */
router.get('/settings', function(req, res, next) {
  res.render('settings');
});
/* GET TBD page. */
router.get('/TBD', function(req, res, next) {
  res.render('TBD');
});

/* GET items page. */
 router.get('/items', function(req, res, next) {
 	
 	var dailyItem=[];
 	// dailyItem.push("Test")
 	var weeklyItem=[];
 
   if (req.query.daily == 'yes') {
   	//Need to add a random number generator
   	dailyItem.push(dailyYes.dailyRewards[yesDayValue])
   	// res.send(dailyItem)
 
   }
   else if (req.query.daily == 'no') {
   	//get daily rewards item
   	dailyItem.push(dailyNo.dailyPenalty[noDayValue])
   	// res.send(dailyItem)
   }
 
   if (req.query.weekly == 'yes') {
   	//get weekly rewards item
   	weeklyItem.push(weeklyYes.weeklyRewards[yesWeekValue])
    	// res.send(weeklyItem)
 
   }
   else if (req.query.weekly == 'no') {
   	//get weekly rewards item
  	weeklyItem.push(weeklyNo.weeklyPenalty[noWeekValue])
    	// res.send(weeklyItem)
   }
   console.log(dailyItem);
   // render daily/weekly items based on quest response
   res.render('social', {daily: dailyItem, weekly: weeklyItem});
   // res.send("Reached Items route")
 
 });

module.exports = router;