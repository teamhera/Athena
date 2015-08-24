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
              console.log(d.id);
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

