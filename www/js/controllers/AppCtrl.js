/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('AppCtrl',['$scope','$ionicSideMenuDelegate','$rootScope','PersonDB','Person','$cookies','$ionicHistory','PopupFactory',
        function($scope,$ionicSideMenuDelegate,$rootScope,PersonDB,Person,$cookies,$ionicHistory,PopupFactory){
            $rootScope.messages = [];

            io.on('questionPresenter', function(data){
                console.log(data);
                if($rootScope.user.role.name == 'presenter'){
                    alert("Question de " + data.from.name + " - " + data.question);
                }
            });

            io.on('pergunta',function(data){

                if($rootScope.user.role.name == 'moderator'){
                    $scope.ask = data;
                    //Se o cara não estiver na tela de perguntas, então aparece um popup de pergunta recebida....
                    console.log($ionicHistory.currentView());
                    var state = $ionicHistory.currentView();
                    if(state.stateId != "app.pergunta" || true){
                        PopupFactory.perguntaReceived($scope);
                    }

                    //Adiciona a pergunta na lista
                    $rootScope.listAsks.push($scope.ask);



                }
            });
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