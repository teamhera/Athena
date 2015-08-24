var govTrack = require('govtrack-node');
var Promise = require('bluebird');

var promiseGov = Promise.promisifyAll(govTrack);

module.exports = {

  getAllMembers: function(callback) {
    // parameter finds only current members of Congress in API request
    promiseGov.findRoleAsync({  current: true,
                                limit: 600,
                                fields: 'person__id,person__firstname,person__lastname,person__name,role_type,district'
                              })
      .then(function(res){
        callback(res.objects);
      })
      .catch(function(err){
        console.log('Error in getAllMembers:', err);
      });
  },

  getMember: function(id, callback) {
    promiseGov.findPersonAsync({id: id})
      .then(function(res){
        callback(res);
      })
      .catch(function(err){
        console.log('Error in getMember:', err);
      });
  },

  getMemberVotes: function(person_id, callback) {
    promiseGov.findVoteVoterAsync({person: person_id, sort: '-created', limit: 600})
      .then(function(res){
        callback(res.objects);
      })
      .catch(function(err){
        console.log('Error in getMemberVotes:', err);
      });
  },

  getMemberHistoricVotes: function(person_id, callback) {
    promiseGov.findVoteVoterAsync({person: person_id,
                                   sort: '-created',
                                   limit: 1500,
                                   fields: 'created,option__value,vote__category,vote__question,vote__number,vote__percent_plus,vote__link,vote__related_bill'
                                 })
      .then(function(res){
        callback(res.objects);
      })
      .catch(function(err){
        console.log('Error in getMemberHistoricVotes: ', err);
      });
  }
};
