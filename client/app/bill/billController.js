module.exports = function billController($scope, Home){
  $scope.bills = [];
  $scope.congresses = [];
  $scope.searchField = "";
  $scope.searchHeader = "";
  $scope.query = {order_by: '-current_status_date', offset: 0};
  $scope.displayFilter = false;
  $scope.dropdownOne = 'Congress';
  var ending = [[0,''], [1,'st'], [2,'nd'], [3,'rd'], [4,'th'], [5,'th'], [6,'th'], [7,'th'], [8,'th'], [9,'th'],
                [10, 'th'], [11, 'th'], [12, 'th'], [13, 'th'], [14, 'th'], [15, 'th'], [16, 'th'], [17, 'th'], [18, 'th'], [19, 'th'],
                [20, 'th'], [21, 'st'], [22, 'nd'], [23, 'rd'], [24, 'th'], [25, 'th'], [26, 'th'], [27, 'th'], [28, 'th'], [29, 'th'],
                [30, 'th'], [31, 'st'], [32, 'nd'], [33, 'rd'], [34, 'th'], [35, 'th'], [36, 'th'], [37, 'th'], [38, 'th'], [39, 'th'],
                [40, 'th'], [41, 'st'], [42, 'nd'], [43, 'rd'], [44, 'th'], [45, 'th'], [46, 'th'], [47, 'th'], [48, 'th'], [49, 'th'],
                [50, 'th'], [51, 'st'], [52, 'nd'], [53, 'rd'], [54, 'th'], [55, 'th'], [56, 'th'], [57, 'th'], [58, 'th'], [59, 'th'],
                [60, 'th'], [61, 'st'], [62, 'nd'], [63, 'rd'], [64, 'th'], [65, 'th'], [66, 'th'], [67, 'th'], [68, 'th'], [69, 'th'],
                [70, 'th'], [71, 'st'], [72, 'nd'], [73, 'rd'], [74, 'th'], [75, 'th'], [76, 'th'], [77, 'th'], [78, 'th'], [79, 'th'],
                [80, 'th'], [81, 'st'], [82, 'nd'], [83, 'rd'], [84, 'th'], [85, 'th'], [86, 'th'], [87, 'th'], [88, 'th'], [89, 'th'],
                [90, 'th'], [91, 'st'], [92, 'nd'], [93, 'rd'], [94, 'th'], [95, 'th'], [96, 'th'], [97, 'th'], [98, 'th'], [99, 'th'],
                [100, 'th'], [101, 'st'], [102, 'nd'], [103, 'rd'], [104, 'th'], [105, 'th'], [106, 'th'], [107, 'th'], [108, 'th'], [109,'th'],
                [110, 'th'], [111, 'th'], [112, 'th'], [113, 'th'], [114, 'th']
                ];
  for (var i = 114; i > 0; i--){
    $scope.congresses.push([ending[i][0], ending[i][0] + ending[i][1] + ' Congress']);
  }
    

  $scope.getAllBills = function(offset){
    if (offset === undefined){
      offset = 0;
    }
    if ($scope.searchField === "" && $scope.query.q){
      delete $scope.query.q;
    }
    if ($scope.searchField !== ""){
      $scope.query.q = $scope.searchField;
    }
    if ($scope.query.congress === undefined && $scope.query.q === undefined){
      alert('Please enter a query');
      return;
    }
    $scope.query.offset += offset;
    Home.getAllBills($scope.query)
    .then(function(res){
      $scope.displayFilter = true;
      $scope.bills = [];
      $scope.searchHeader = $scope.dropdownOne + ' ' + $scope.searchField;
      angular.forEach(res, function(bill){
        $scope.bills.push(bill);
      });
    }).catch(function(err){
      throw err;
    });
  };

  $scope.selectCongress = function(el){
    if (el === 'all'){
      $scope.dropdownOne = 'Search All';
      delete $scope.query.congress;
    }
    else {
      $scope.dropdownOne = el.congress[1];
      $scope.query.congress = el.congress[0];
    }
  };

  $scope.queryBuilder = function(){
    var sortable = {};
    var filterableWithoutOperators = {
      q: ""
    };
    var filterableWithOperators = {};
    var other = {};

  };

};

