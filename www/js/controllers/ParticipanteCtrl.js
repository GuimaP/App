window.app.controller('ParticipanteCtrl',['$scope','$rootScope','PersonAPI',function($scope,$rootScope,PersonAPI){
    $scope.gridSelected = true;

    $rootScope.title = "Quem é Quem?";



    PersonAPI.allClients()
    .then(function(d){
        console.log(d);
        $scope.participantes  = d.data;
    });

    $scope.grid = function(){
        $scope.gridSelected = true;
    }

    $scope.list = function(){
        $scope.gridSelected = false;
    }
}]);