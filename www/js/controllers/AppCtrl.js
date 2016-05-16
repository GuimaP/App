/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('AppCtrl',['$scope','$ionicSideMenuDelegate','$rootScope','PersonDB','Person','$cookies','$ionicHistory','PopupFactory','$state','$ionicPopup',
        function($scope,$ionicSideMenuDelegate,$rootScope,PersonDB,Person,$cookies,$ionicHistory,PopupFactory,$state,$ionicPopup){



            //$rootScope.messages = [];
            $scope.classMenuTopo = "";

            $(window).unload(function() {
                io.emit('disconnectUser',$rootScope.user);
            });


            window.io.on('newUser',function(data){
                $rootScope.conversas = data;
                console.log($rootScope.conversas);
                $rootScope.$apply();
            });

            window.io.on('receiveUsers',function(data){
                $rootScope.conversas = data;
                console.log($rootScope.conversas);
                $rootScope.$apply();
            });

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

            $scope.$on('$ionicView.afterEnter',function(ev,data){

            });

            $scope.$on("$ionicView.beforeEnter", function(event, data){

                console.log(data);
                console.log(event);

                $scope.currentView = data.stateId;

                console.log($scope.currentView);


                console.log(this.classMenuTopo);

                if(data.stateId == 'app.perfil'){
                    $scope.classMenuTopo = "collapse-menu";

                }else {
                    $scope.classMenuTopo = "";
                }

                console.log($scope.classMenuTopo,data.stateId )

                if($ionicSideMenuDelegate.isOpen()){
                    $ionicSideMenuDelegate.toggleRight();
                }



                PersonDB.search("Person")
                    .then(function(data){
                        if(data.length > 0){
                            $rootScope.user = data[0].doc;
                            $scope.myUser = $rootScope.user;
                            $rootScope.hasLogged = true;
                            $scope.$apply();
                            console.log($rootScope.user);
                            $rootScope.$apply();

                            console.log("Load");

                            window.io.emit('connectUser',$rootScope.user);

                            $rootScope.subtitle = $rootScope.user.name;
                        }


                    })
                    .catch(function(err){
                        console.log(err);
                    });
            });



            $scope.notaPerfil = function(){

                var myPopup = $ionicPopup.show({
                    templateUrl: '../templates/popup/nota-perfil.html',
                    title: 'Notas de Perfil',
                    cssClass: 'nota-Perfil',
                    scope: $scope,
                    buttons: [
                        {
                            text: '',
                            type: 'icon ion-close-round cancel',

                        },
                        {
                            text: 'Salvar',
                            type: 'button-positive save',
                            onTap: function(e) {
                                if (!$scope.data.wifi) {
                                    //don't allow the user to close unless he enters wifi password
                                    e.preventDefault();
                                } else {
                                    return $scope.data.wifi;
                                }
                            }
                        }
                    ]
                });

                myPopup.then(function(res) {
                    console.log('Tapped!', res);
                });
            }

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleRight();
        };





}]);