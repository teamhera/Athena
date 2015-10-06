var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('angular-animate');
require('angular-loading-bar');
var home = require('./app/home');
var profile = require('./app/profile');
var bill = require('./app/bill');

/*Entry Point for routing*/
var congressmanprofile = angular.module('congressmanprofile', [
  // add in controller dep
  //ex congressmanprofile.home
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar', 
  'ngAnimate',
  home.name,
  profile.name,
  bill.name
  ])

// Router for app
.config(function($locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home/home.html',
      controller: 'homeController'
    })
    .state('profile', {
      url: '/profile/:id',
      templateUrl: 'views/profile/profile.html',
      controller: 'profileController'
    })
    .state('bill', {
      url: '/bill',
      templateUrl: 'views/bill/bill.html',
      controller: 'billController'
    });

});


