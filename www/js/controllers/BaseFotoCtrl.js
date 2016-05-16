window.app.controller("BaseFotoCtrl",function($scope,$rootScope){
    $scope.$on('$ionicView.afterEnter',function(ev,data){
        if(data.stateId == 'base.foto'){
            $scope.classMenuTopo = "collapse-menu";

        }else {
            $scope.classMenuTopo = "";
        }

        $scope.$apply();
    });
});