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
		if($scope.fromValue==0.00)
		{
		$scope.fromValue='';
		}
      };
  }]);
function validateFloatKeyPress(el, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot
    if(number.length>1 && charCode == 46){
         return false;
    }
    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
        return false;
    }
    return true;
}


function getSelectionStart(o) {
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveEnd('character', o.value.length)
		if (r.text == '') return o.value.length
		return o.value.lastIndexOf(r.text)
	} else return o.selectionStart
}
