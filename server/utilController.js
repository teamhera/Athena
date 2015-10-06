var _ = require('underscore');

module.exports = {

  // takes in a JSON listing of a single congress person, returns a shortened object like:
  /*  { 
        id: 400408,
        firstName: 'Patrick',
        lastName: 'Toomey',
        title: 'Sen. Patrick “Pat” Toomey [R-PA]' 
      } 
  */
  makeMemberEntry: function(listing) {
    return {
      id: listing.person.id,
      firstName: listing.person.firstname,
      lastName: listing.person.lastname,
      title: listing.person.name,
      role: listing.role_type
    };
  },

  // takes in a JSON listing of a listing from govTrack Person API, returns like:
  /*  { 
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
  makeMemberProfile: function(listing) {
    return {
      id: listing.id,
      firstname: listing.firstname,
      lastname: listing.lastname,
      fullname: listing.name,
      description: listing.roles[listing.roles.length - 1].description,
      party: listing.roles[listing.roles.length - 1].party,
      role: listing.roles[listing.roles.length - 1].role_type,
      birthday: listing.birthday,
      enddate: listing.roles[listing.roles.length - 1].enddate,
      twitterid: listing.twitterid,
      youtubeid: listing.youtubeid,
      website: listing.roles[listing.roles.length - 1].website,
      phone: listing.roles[listing.roles.length - 1].phone
    };
  },

  makeVoteInfo: function(listing) {
    return {
      id: listing.vote.id,
      link: listing.vote.link,
      vote: listing.option.value,
      bill_question: listing.vote.question,
      bill_question_details: listing.vote.question_details,
      result: listing.vote.result
    };
  },

  // takes in a JSON listing of a listing from govTrack Vote API, returns like:
  /*  {
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
  makeBillInfo: function(listing) {
    return {
      question: listing.question,
      thomas_link: listing.thomas_link,
      current_status: listing.current_status,
      question_details: listing.question_details,
      total_minus: listing.total_minus,
      total_other: listing.total_other,
      total_plus: listing.total_plus,
      created: listing.created,
      margin: listing.margin,
      vote_type: listing.vote_type
    };
  },

  //takes JSON listings and returns an object with only relevant data indexed by bill number
  makeBillSearch: function(listings){
    cleanListings = {};
    _.each(listings, function(listing){
      cleanListings[listing.number] = {
        title: listing.title

      };
    });
    return cleanListings;
  },

  /*
    The function that will initially create a list with random congressmen,
    and then, every time a congressman was searched, will add him/her to this list.
    Takes the array of all members and the trendingList array; relies on its side effects
   */
  addMembersToTrendingList: function(memberId, allMembers, trendingList){
    if(!memberId){ // creates the initial trending list
      var tempMembersArray = _.shuffle(_.values(allMembers));
      for (var i = 0; i < 8; i++){
        trendingList.push(tempMembersArray.pop());
     }
    } else {
      // if trendind list does not contain a congressman with memberId
      if(!_.find(trendingList, function(member){return member.id === memberId;})){
        // add this congressman to the beginning of tranding list
        // and remove last congressman from the trending list
        var member = allMembers[memberId];
        trendingList.pop();
        trendingList.unshift(member);
      }
    }
  }

};
