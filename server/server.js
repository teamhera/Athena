var express = require('express');
var pathParse = require('path-parse'); // polyfill for older Node versions
var favicon = require('serve-favicon');
var members = require('./memberController');
var bills = require('./billController');
var utils = require('./utilController');

var app = express();

app.use(express.static(__dirname + "/../public"));
app.use(favicon(__dirname + '/../client/favicon.ico'));

/* memberList will eventually look like this after initial API call resolves
  { id1: {memberEntry},
    id2: {memberEntry},
    id3: {memberEntry},
    id4: {memberEntry},
    id5: {memberEntry}, ...
  } 
*/
var memberList = {};

/*  memberProfile will eventually look like this after a GET request to a member_ID
  { 
    id: 412669,
    name: 'Sen. Mike Rounds [R-SD]',
    description: 'Junior Senator from South Dakota',
    party: 'Republican',
    birthday: '1954-10-24',
    enddate: '2021-01-03',
    twitterid: 'SenatorRounds',
    youtubeid: null,
    website: 'http://www.rounds.senate.gov',
    phone: '202-224-5842' 
  }
*/
var memberProfile = {};

/* memberVotes will look like this after a GET request to a specific member's voting record
  { 
    bill_id1: 'voteResult', (bill_id is a number, voteResult is a string of 'Yea', 'Nay', or 'Not Voting')
    bill_id2: 'voteResult', (maybe other voteResults are possible but I haven't seen them)
    bill_id3: 'voteResult',
    bill_id4: 'voteResult', ...
  }
*/
var memberVotes = {};

/* billInfo will look like this after a GET request to a specific bill_ID 
  {
    question: 'Cloture on S. 1881: A bill to prohibit Federal funding of Planned Parenthood Federation of America.',
    thomas_link: undefined,
    current_status: undefined,
    question_details: 'On Cloture on the Motion to Proceed in the Senate',
    total_minus: 46,
    total_other: 1,
    total_plus: 53,
    created: '2015-08-03T17:36:00',
    margin: 0.0707071,
    vote_type: 'On the Cloture Motion'
  }
*/
var billInfo = {};

// Set up routing to listen for GET requests from front-end

// on a GET request to '/members/*' we see if it is a call for all members or a specific member
app.get('/members/*', function(req, res){
  var pathObj = pathParse(req.url);
  // if call for all, send back JSON of memberList created on server start
  if (pathObj.base === 'all') {
    res.send(memberList);
  } else { // we are depending on the base being a valid member_id if it is not 'all'
    var member_id = Number(pathObj.base);
    members.getMember(member_id, function(listing){ // use callback in getMember() to populate the memberProfile object
      memberProfile = utils.makeMemberProfile(listing);
      res.send(memberProfile); // send back just the profile for that member
    });
  }
});

// on a GET request to 'votes/*', we are counting on the * to be a valid number for a member_ID
// we use path to parse out the base of the url which will be the member_ID as a string
// sends back memberVotes JSON to client
app.get('/votes/*', function(req, res){
  var pathObj = pathParse(req.url);
  var member_id = Number(pathObj.base);
  members.getMemberVotes(member_id, function(objects){
    objects.forEach(function(listing){
      var bill_id = listing.vote.id;
      memberVotes[bill_id] = listing.option.value;
    });
    res.send(memberVotes);
  });
});

// on a GET request to 'bills/*', we are counting on the * to be a valid number for a bill_ID
// we use path to parse out the base of the url which will be the bill_ID as a string
app.get('/bills/*', function(req, res){
  var pathObj = pathParse(req.url);
  var bill_id = Number(pathObj.base);
  bills.getBillInformation(bill_id, function(listing){ // populates billInfo object with bill data
    billInfo = utils.makeBillInfo(listing);
    res.send(billInfo); // sends back JSON object to client
  });
});

// this expression runs on server start, retrieves a list of current members and writes it to memberList
members.getAllMembers(function(objects){
  objects.forEach(function(listing){
    var id = listing.person.id;
    memberList[id] = utils.makeMemberEntry(listing);
  });
});

module.exports = app;
