
module.exports = function homeFactory($http){

  var allMembers = [];
  var trendingMembers = [];
  getAllMembers();

  /*******************************************
   * Loads All Members Name and ID from server
   ******************************************/
  
  function getAllMembers(){
    return $http({
      method: 'GET',
      url: '/members/all',
    })
    .then(function(res){
      for (var id in res.data.memberList){
        allMembers.push(res.data.memberList[id]);
      }

      for (var i = 0; i < res.data.trendingList.length; i++){
        trendingMembers.push(res.data.trendingList[i]);
      }
    });
  }

  /*******************************************
   * Load one Member Profile from server
   ******************************************/

  function getMember(id){
    return $http({
      method: 'GET',
      url: '/members/'+id,
    })
    .then(function(res){
      return res.data;
    });
  }

  /*******************************************
   * Load Member's Vote from server
   ******************************************/

  function getMemberVotes(id){
    return $http({
      method: 'GET',
      url: '/votes/'+id,
    })
    .then(function(res){
      return res.data;
    });
  }

   /*******************************************
   * Load Bill Details from server
   ******************************************/

  function getBillDetails(id){
    return $http({
      method: 'GET',
      url: '/bills/'+id,
    })
    .then(function(res){
      return res.data;
    });
  }

  /******************************************************
  * Load Historic Votes from server to populate D3 Graph
  *******************************************************/

  function getHistoricVotes(id){
    return $http({
      method: 'GET',
      url: '/members/historic/'+id,
    })
    .then(function(res){
      return res.data;
    });
  }

  /******************************************************
  * Load all bills from server
  *******************************************************/

  function getAllBills(query){
    return $http({
      method: 'GET',
      url: '/billSearch',
      params: query
    })
    .then(function(res){
      return res.data;
    });
  }

  /******************************************************
  * Load all votes on bill from server
  *******************************************************/

  function getBillVotes(id){
    return $http({
      method: 'GET',
      url: '/billvotes/' + id
    })
    .then(function(res){
      return res.data;
    });
  }
  /*******************************************
   * Expose factory functions to the controller
   ******************************************/

  return({
    allMembers: allMembers,
    trendingMembers: trendingMembers,
    getAllMembers: getAllMembers,
    getMember: getMember,
    getMemberVotes: getMemberVotes,
    getBillDetails: getBillDetails,
    getHistoricVotes: getHistoricVotes,
    getAllBills: getAllBills,
    getBillVotes: getBillVotes
  });

};
