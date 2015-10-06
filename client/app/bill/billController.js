module.exports = function billController($scope, Home){
  $scope.bills = [];

  $scope.getAllBills = function(query){
    Home.getAllBills({congress: 112})
    .then(function(res){
      angular.forEach(res, function(bill){
        $scope.bills.push(bill);
      });
      console.log($scope.bills);
    }).catch(function(err){
      throw err;
    });
  };
};