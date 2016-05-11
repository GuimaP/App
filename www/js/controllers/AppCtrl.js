/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('AppCtrl',['$scope','$ionicSideMenuDelegate','$rootScope','PersonDB','Person','$cookies',
        function($scope,$ionicSideMenuDelegate,$rootScope,PersonDB,Person,$cookies){
            $rootScope.messages = [];


            io.on('note',function(data){
                console.log(data);
            });

            $scope.$on("$ionicView.beforeEnter", function(event, data){

                PersonDB.search("Person")
                    .then(function(data){
                        if(data.length > 0){
                            $rootScope.user = data[0].doc;
                            console.log($rootScope.user);

                            window.io.emit('connectUser',$rootScope.user);

                            console.log($rootScope.user);
                            $rootScope.$apply();
                        }

                        $state.go('app.home');
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            });













        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleRight();
        };






}]);