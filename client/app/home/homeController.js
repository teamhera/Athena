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
  $scope.stateIdName = {1: 'Alabama', 2: 'Alaska', 4: 'Arizona', 5: 'Arkansas', 6: 'California', 8: 'Colorado', 9: 'Connecticut', 10: 'Delaware', 12: 'Florida', 13: 'Georgia', 15: 'Hawaii', 16: 'Idaho', 17: 'Illinois', 18: 'Indiana', 19: 'Iowa', 20: 'Kansas', 21: 'Kentucky', 22: 'Lousiana', 23: 'Maine', 24: 'Maryland', 25: 'Massachusetts', 26: 'Michigan', 27: 'Minnesota', 28: 'Mississippi', 29: 'Missouri', 30: 'Montana', 31: 'Nebraska', 32: 'Nevada', 33: 'New Hampshire', 34: 'New Jersey', 35: 'New Mexico', 36: 'New York', 37: 'North Carolina', 38: 'North Dakota', 39: 'Ohio', 40: 'Oklahoma', 41: 'Oregon', 42: 'Pennsylvania', 44: 'Rhode Island', 45: 'South Carolina', 46: 'South Dakota', 47: 'Tennessee', 48: 'Texas', 49: 'Utah', 50: 'Vermont', 51: 'Virginia', 53: 'Washington', 54: 'West Virginia', 55: 'Wisconsin', 56: 'Wyoming'};

  $scope.gotoMember = function(){
    var id = $scope.memberSearch.id;
    $state.go('profile', {id:id});
  };

  $scope.switchView = function() {
    $scope.isMapView = $scope.isMapView ? false : true;
    buildMap();
    console.log($scope.allMembers);
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


  $scope.getDistrictMember = function(stateDistrictId){
    stateDistrictId = stateDistrictId.toString();
    //Need to check if state ID is one or two digits before slicing
    var stateId = stateDistrictId.length === 3 ? stateDistrictId.slice(0, 1) : stateDistrictId.slice(0, 2);
    var stateName = $scope.stateIdName[stateId];
    //District ID is always the last 2 digits
    var districtId = stateDistrictId.slice(-2);
    console.log('stateId: ' + stateId);
    console.log('stateName: ' + stateName);
    console.log('districtId: ' + districtId);
    if(districtId[0] === 0){
      //Slice 0 out of district ID if single digit
      districtId = districtId[1];
    }
  };

  function buildMap(){
    var us;
    var congress;
    Home.getMapData()
    .then(function(data){
      us = data;
      Home.getCongressData()
      .then(function(data){
        congress = data;
        var width = 960,
            height = 600;

        var projection = d3.geo.albersUsa()
            .scale(1280)
            .translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

          svg.append("defs").append("path")
              .attr("id", "land")
              .datum(topojson.feature(us, us.objects.land))
              .attr("d", path);

          svg.append("clipPath")
              .attr("id", "clip-land")
            .append("use")
              .attr("xlink:href", "#land");

          svg.append("g")
              .attr("class", "districts")
              .attr("clip-path", "url(#clip-land)")
            .selectAll("path")
              .data(topojson.feature(congress, congress.objects.districts).features)
            .enter().append("path")
              .attr("d", path)
            .on("click", function(d){
              $scope.getDistrictMember(d.id);
            })
            .append("title")
              .text(function(d) { return d.id; });

          svg.append("path")
              .attr("class", "district-boundaries")
              .datum(topojson.mesh(congress, congress.objects.districts, function(a, b) { return a !== b && (a.id / 1000 || 0) === (b.id / 1000 || 0); }))
              .attr("d", path);

          svg.append("path")
              .attr("class", "state-boundaries")
              .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
              .attr("d", path);
      });
    });
  }
};

