/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('LoginCtrl',['$scope','$state',function($scope,$state){
    $scope.signin = function(){
        $state.go('app.home');
    }
}]);