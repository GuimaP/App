window.app.controller('ChatCtrl', function($scope,$rootScope,$state){
    $scope.myUser = $rootScope.user;
    $scope.messages = $rootScope.messages;

    window.io.on('newUser',function(data){
        $rootScope.conversas = data;
        console.log($rootScope.conversas);
        $scope.$apply();
    });

    window.io.on('receiveUsers',function(data){
        $rootScope.conversas = data;
        console.log($rootScope.conversas);
        $scope.$apply();
    });


    $scope.$on("$ionicView.beforeEnter", function(event, data){
        console.log('ae');
        window.io.emit('allUsers');




        $scope.selectUser = function(index){
            $state.go("app.converstation",{ index: index});
        }

    });





});
