angular.module('Convert', [])
  .controller('currConverter', ['$scope', '$http', function ($scope, $http) {
      $scope.rates = {};
      $http.get('http://api.fixer.io/latest?base=INR&symbols=USD,CAD,EUR')
        .then(function (res) {
            $scope.rates = res.data.rates;
            $scope.toType = $scope.rates.USD;
            $scope.fromType = $scope.rates.CAD;
            $scope.fromValue = 0.00;
	    $scope.myVar = false;
            $scope.currConvert();
	
        });
	$scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    		};
      $scope.currConvert = function () {
		

          $scope.toValue = $scope.fromValue * ($scope.toType * (1 / $scope.fromType));
          $scope.toValue = $scope.toValue.toFixed(2);
	  $scope.fromValue = $scope.fromValue.toFixed(2);
		if($scope.fromValue == 0.00)
		{
		$scope.fromValue = '';
		}
      };
  }])
.directive('numberValidation', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (value) {
                var flag = value.replace(/[^0-9\.]+/g, '');
                if (value != flag || value.indexOf('.') != value.lastIndexOf('.')) {
                    if (value.indexOf('.') != value.lastIndexOf('.')) {
                        flag = flag.substring(0, flag.length - 1);
                    }
                }

                if (flag.indexOf('.') != -1) {
                    if (flag.length > (flag.indexOf('.') + 3)) {
                        flag = flag.substring(0, flag.length - 1);
                    }
                }
                ngModelCtrl.$setViewValue(flag);
                ngModelCtrl.$render();
                return flag;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode == 32) {
                    event.preventDefault();
                }
            });
        }
    };
});
