/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('AppCtrl',['$scope','$ionicSideMenuDelegate','$rootScope','PersonDB','Person','$cookies',
        function($scope,$ionicSideMenuDelegate,$rootScope,PersonDB,Person,$cookies){


        $rootScope.messages = [];

        io.on('messageReceived',function(data){
            $rootScope.messages.push(data);

            $rootScope.$apply();

            console.log($scope.messages);
            console.log(data);
        });

        io.on('note',function(data){
            console.log(data);
        });



        //Verifica se existe um usuario no banco
        if(!$rootScope.user){
            //Pega do Cookie
           $rootScope.user = $cookies.getObject('userData');

            console.log($rootScope.user);
        }else {
            console.log($rootScope.user);
        }


        io.emit('connectUser',$rootScope.user);


        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleRight();
        };






}]);