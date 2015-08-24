module.exports = function idController($scope, $stateParams, Home){
  $scope.getBill = function(id){
    if (id === undefined){
      id = $stateParams.id;
    }
    console.log(id);
    Home.getBillDetails(id)
      .then(function(res){
        $scope.bill = res;
        console.log($scope.bill);
        if ($scope.bill === undefined){
          $scope.failMessage = "We didn't find any info for that bill :(";
        }
      }).catch(function(err){
        throw err;
    });
  };

  $scope.formatDate = function(date){
    date = date.slice(date.indexOf('(') + 1, date.indexOf(')'));
    date = date.split(', ');
    var theDay = new Date(date[0], date[1], date[2], date[3]);
    return theDay.toDateString();
  };

  $scope.getBill();
};
