/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('AppCtrl',['$scope','$ionicSideMenuDelegate','$rootScope','PersonDB','Person','$cookies',
        function($scope,$ionicSideMenuDelegate,$rootScope,PersonDB,Person,$cookies){

            $scope.$on("$ionicView.beforeEnter", function(event, data){

                PersonDB.search("Person")
                    .then(function(data){
                        if(data.length > 0){

                            console.log($rootScope.user);
                            window.io.emit('connectUser',$rootScope.user);
                        }

                        $state.go('app.home');
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            });
        $rootScope.messages = [];


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