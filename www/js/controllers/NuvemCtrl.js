window.app.controller('NuvemCtrl',['$scope',function($scope){
    $scope.pergunta = "";
    $scope.sendAsk = function(){

        io.emit('ask',this.pergunta);
    }
}]);
