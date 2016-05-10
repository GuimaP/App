window.app.controller('ChatCtrl', function($scope,$rootScope,$state){
    $scope.myUser = $rootScope.user;
    $scope.messages = $rootScope.messages;




    $scope.$on("$ionicView.beforeEnter", function(event, data){
        console.log('ae');
        window.io.emit('allUsers');




        $scope.selectUser = function(index){
            $state.go("app.converstation",{ index: index});
        }

    });





});
