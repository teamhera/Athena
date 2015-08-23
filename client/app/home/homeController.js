//Home Controller


var Raphael = require('Raphael');
var Home = require('./homeFactory.js');
var d3 = require('d3');
var topojson = require('topojson');


module.exports = function homeController($scope, $state, Home){

  $scope.member = {};
  $scope.allMembers = Home.allMembers;
  $scope.trendingMembers = Home.trendingMembers;
  $scope.isMapView = false;
  $scope.stateMembers = [];

  $scope.gotoMember = function(){
    var id = $scope.memberSearch.id;
    $state.go('profile', {id:id});
  };

  $scope.switchView = function() {
    $scope.isMapView = $scope.isMapView ? false : true;
    buildMap();
  };

  $scope.getStateMembers = function(state) {
    $scope.stateMembers = [];

    for (var i = 0; i < $scope.allMembers.length; i++){
      var memberTitle = $scope.allMembers[i].title;
      if(memberTitle.match(/.*\[.*\-(.{2})/)){
        var memberState = memberTitle.match(/.*\[.*\-(.{2})/)[1];
        if (memberState === state){
           $scope.stateMembers.push($scope.allMembers[i]);
        }
      } else {
        console.log("did not work ", memberTitle);
      }
    }
    $scope.$apply(function(){
      $scope.stateMembers = $scope.stateMembers;
    });
  };


function buildMap(){
}

};

