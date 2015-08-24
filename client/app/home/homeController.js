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
  $scope.stateIdName = {1: 'AL', 2: 'AK', 4: 'AZ', 5: 'AR', 6: 'CA', 8: 'CO', 9: 'CT', 10: 'DE', 11: 'DC', 12: 'FL', 13: 'GA', 15: 'HI', 16: 'ID', 17: 'IL', 18: 'IN', 19: 'IA', 20: 'KS', 21: 'KY', 22: 'LA', 23: 'ME', 24: 'MD', 25: 'MA', 26: 'MI', 27: 'MN', 28: 'MS', 29: 'MO', 30: 'MT', 31: 'NE', 32: 'NV', 33: 'NH', 34: 'NJ', 35: 'NM', 36: 'NY', 37: 'NC', 38: 'ND', 39: 'OH', 40: 'OK', 41: 'OR', 42: 'PA', 44: 'RI', 45: 'SC', 46: 'SD', 47: 'TN', 48: 'TX', 49: 'UT', 50: 'VT', 51: 'VA', 53: 'WA', 54: 'WV', 55: 'WI', 56: 'WY'};
  $scope.gotoMember = function(){
    var id = $scope.memberSearch.id;
    $state.go('profile', {id:id});
  };

  $scope.switchView = function() {
    $scope.isMapView = !$scope.isMapView;
    //builds d3 Map on view switch
    buildMap();
  };

  // $scope.getStateMembers = function(state) {
  //   $scope.stateMembers = [];

  //   for (var i = 0; i < $scope.allMembers.length; i++){
  //     var memberTitle = $scope.allMembers[i].title;
  //     if(memberTitle.match(/.*\[.*\-(.{2})/)){
  //       var memberState = memberTitle.match(/.*\[.*\-(.{2})/)[1];
  //       if (memberState === state){
  //          $scope.stateMembers.push($scope.allMembers[i]);
  //       }
  //     } else {
  //       console.log("did not work ", memberTitle);
  //     }
  //   }
  //   $scope.$apply(function(){
  //     $scope.stateMembers = $scope.stateMembers;
  //   });
  // };


  $scope.getDistrictMember = function(stateDistrictId){
    $scope.stateMembers = [];
    stateDistrictId = stateDistrictId.toString();
    //Need to check if state ID is one or two digits before slicing
    var stateId = stateDistrictId.length === 3 ? stateDistrictId.slice(0, 1) : stateDistrictId.slice(0, 2);
    var stateName = $scope.stateIdName[stateId];
    //District ID is always the last 2 digits
    var districtId = parseInt(stateDistrictId.slice(-2));
    if(districtId[0] === 0){
      //Slice 0 out of district ID if single digit
      districtId = districtId[1];
    }
    for(var i = 0; i < $scope.allMembers.length; i++){
      var memberTitle = $scope.allMembers[i].title;
      var memberDistrict = $scope.allMembers[i].district;
      if(memberTitle.match(/.*\[.*\-(.{2})/)){
        var memberState = memberTitle.match(/.*\[.*\-(.{2})/)[1];
        if (memberState === stateName){
        }
        if (memberState === stateName && memberDistrict === districtId){
          $scope.stateMembers.push($scope.allMembers[i]);
        }
      }
    }
     $scope.$apply(function(){
      $scope.stateMembers = $scope.stateMembers;
    });
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

        var svg = d3.select("#map").append("svg")
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

