window.app.controller('ChatCtrl', function($scope,$rootScope,$state,$ionicHistory){

    $scope.$on("$ionicView.beforeEnter", function(event, data){

        $scope.messages = $rootScope.messages;

        console.log($scope.myUser);

        $scope.selectUser = function(index){
            $state.transitionTo("app.converstation",{ index: index});
        }

    });





});
