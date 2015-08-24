var angular = require("angular");

var billController = require("./billController.js");
var idController = require("./idController.js");
var barController = require("./barController.js");
var Home = require('../home/homeFactory.js');

module.exports = angular.module("congressmanprofile.bill", [])
  .controller('billController', billController)
  .controller('idController', idController)
  .controller('barController', barController)
  .factory('Home', Home);