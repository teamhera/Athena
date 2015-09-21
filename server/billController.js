var govTrack = require('govtrack-node');
var Promise = require('bluebird');
var utils = require('./utilController');

var promiseGov = Promise.promisifyAll(govTrack);

module.exports = {

  getBillInformation: function(bill_id, callback) {
    promiseGov.findBillAsync({id: bill_id})
      .then(function(res){
        callback(res);
      })
      .catch(function(err){
        console.log('Error in getBillInformation:', err);
      });
  },

  getBillVoteInformation: function(bill_id, callback) {
    promiseGov.findVoteAsync({related_bill: bill_id})
      .then(function(res){
        callback(res);
      })
      .catch(function(err){
        console.log('Error in getBillInformation:', err);
      });
  },
  
  //rather than mess with the getBillInformation, which is used just to get specific bills by id,
    //I opted to create another function for the new bill functionality.  It would be wise to merge them
    //at some point.

  //query should be an object with key value pairs representing the search field and query
  getBillsBySearch: function(query, callback) {
    promiseGov.findBillAsync(query)
      .then(function(res){
        callback(res.objects);
      })
      .catch(function(err){
        console.log('Error in getBillsBySearch:', err);
      });
  },

  getBillVoters: function(vote_id, callback) {
    promiseGov.findVoteVoterAsync({vote: vote_id, limit: 500})
      .then(function(res){
        callback(res);
      })
      .catch(function(err){
        console.log('Error in getBillVoters:', err);
      });
  }
};