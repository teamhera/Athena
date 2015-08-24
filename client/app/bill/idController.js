module.exports = function idController($scope, $stateParams, Home){
  $scope.getBill = function(id){
    if (id === undefined){
      id = $stateParams.id;
    }
    console.log(id);
    Home.getBillDetails(id)
      .then(function(res){
        $scope.bill = res;
        if ($scope.bill === undefined){
          $scope.failMessage = "We didn't find any info for that bill :(";
        }
      }).catch(function(err){
        throw err;
    });
  };

  $scope.getBill();
};
