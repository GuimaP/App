/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('AppCtrl',['$scope','$ionicSideMenuDelegate','$rootScope','PersonDB','Person','$cookies','$ionicHistory','PopupFactory','$state','$ionicPopup','PerguntaDB',
        function($scope,$ionicSideMenuDelegate,$rootScope,PersonDB,Person,$cookies,$ionicHistory,PopupFactory,$state,$ionicPopup,PerguntaDB){
            $scope.isModerator = '';
            $scope.isPresenter = '';
            $scope.isDefault = '';
            $scope.isClient = '';


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
            window.io.on('questionPresenter', function(data){
                console.log(data);
                if($rootScope.user.role.name == 'presenter'){
                    //Adiciona a pergunta na lista
                    var pergunta = new Pergunta(data);
                    console.log(pergunta);

                    PerguntaDB.insert(pergunta)
                        .then(function(d){
                            if(!$scope.ask) { $scope.ask = {} };
                            $scope.ask._id = d.id;
                            $scope.ask._rev = d.rev;
                            $scope.status = null;
                            $rootScope.listAsks.push($scope.ask);
                            $rootScope.$apply();
                        });
                }
            });
            window.io.on('pergunta',function(data){

                //Somente moderadores recebem essa pergunta via websocket
                if($rootScope.user.role.name == 'moderator'){
                    //Guarda a pergunta na variavel ask
                    $scope.ask = data;

                    //Se o cara não estiver na tela de perguntas, então aparece um popup de pergunta recebida....
                    //var state = $ionicHistory.currentView();
                    /*if(state.stateId != "app.pergunta" || true){
                        PopupFactory.perguntaReceived($scope);
                    }*/

                    //Adiciona a pergunta na lista
                    var pergunta = new Pergunta(data);
                    console.log(pergunta);

                    PerguntaDB.insert(pergunta)
                    .then(function(d){
                        $scope.ask._id = d.id;
                        $scope.ask._rev = d.rev;
                        $rootScope.listAsks.push($scope.ask);
                        $rootScope.$apply();
                    });

                }
            });
            window.io.on('note',function(data){
                console.log(data);
            });
            window.io.on('sendLiveVoting',function(answer){
                answer.quiz_id = answer.quiz.quiz_id;
                $rootScope.liveVotes.push(answer);
                console.log($rootScope.liveVotes);
            });

            $scope.$on('$ionicView.afterEnter',function(ev,data){

            });

            $scope.$on("$ionicView.beforeEnter", function(event, data){

                $scope.currentView = data.stateId;

                if(data.stateName == 'app.perfil' || data.stateName == 'app.converstation'){
                    $scope.classMenuTopo = "collapse-menu";

                }else {
                    $scope.classMenuTopo = ".";
                }

                if($ionicSideMenuDelegate.isOpen()){
                    $ionicSideMenuDelegate.toggleRight();
                }



                PersonDB.search("Person")
                .then(function(data){

                    if(data.length > 0){
                        $rootScope.user = data[0].doc;
                        $scope.myUser = $rootScope.user;
                        $rootScope.hasLogged = true;

                        $scope.isModerator = $rootScope.user.role.name == 'moderator';
                        $scope.isDefault = $rootScope.user.role.name == 'client' || $rootScope.user.role.name == 'presenter';
                        $scope.isPresenter = $rootScope.user.role.name == 'presenter';
                        $scope.isClient = $rootScope.user.role.name == 'client';

                        console.log($scope.isModerator);
                        console.log($scope.isPresenter);

                        console.log($scope.isDefault);
                        console.log($scope.isModerator);

                        $scope.$apply();
                        console.log(data);
                        console.log($rootScope.user);
                        $rootScope.$apply();

                        console.log("Load");

                        window.io.emit('connectUser',$rootScope.user);

                        $rootScope.subtitle = $rootScope.user.name;

                        console.log($rootScope.user);

                        console.log($scope.isModerator);
                        console.log($scope.isDefault);
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

            $rootScope.getUser = function(){
                return new Promise(function(resolve,reject){
                    PersonDB.search("Person")
                        .then(function(data){
                            if(data.length > 0){
                                $rootScope.user = data[0].doc;
                                $scope.myUser = $rootScope.user;

                                $scope.$apply();

                                resolve($rootScope.user);
                            }


                        })
                        .catch(function(err){
                            console.log(err);
                            reject(Error(err));
                        });
                });

            }





}]);