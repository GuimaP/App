window.app.controller('ParticipanteCtrl',['$scope','$rootScope',function($scope,$rootScope){
    $scope.gridSelected = true;

    $scope.participantes = [
        {name:"Part 1", photo: "img/ionic.png"},
        {name:"Part 2", photo: "img/ionic.png"},
        {name:"Part 3", photo: "img/ionic.png"},
        {name:"Part 4", photo: "img/ionic.png"},
        {name:"Part 5", photo: "img/ionic.png"},
        {name:"Part 6", photo: "img/ionic.png"},
        {name:"Part 7", photo: "img/ionic.png"},
        {name:"Part 8", photo: "img/ionic.png"},
        {name:"Part 9", photo: "img/ionic.png"},
        {name:"Part 10", photo: "img/ionic.png"},
    ];

    $scope.grid = function(){
        $scope.gridSelected = true;
    }

    $scope.list = function(){
        $scope.gridSelected = false;
    }
}]);