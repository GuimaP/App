window.app.controller("ApresentacaoCtrl",
['$scope','$rootScope','Apresentacao',
function($scope,$rootScope,Apresentacao){

    $scope.$on("$ionicView.beforeEnter", function(event, data){
        Apresentacao.all()
        .then(function(d){
            $scope.apresentacoes = d.data.presentation;
            console.log(d);
        })
        .catch(function(err){
            console.log(err);
        });
    });

}]);
