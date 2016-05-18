/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('PerguntaCtrl',
['$scope','$rootScope','Person','PersonDB','$ionicPopup','PerguntaDB','$filter',
    function($scope,$rootScope,Person,PersonDB,$ionicPopup,PerguntaDB,$filter){


        $scope.pergunta = {};
        $scope.myPerguntas = [];



        $scope.$on("$ionicView.beforeEnter", function(event, data){
            if(!$rootScope.user){ // se não tiver usuario no root, então eu pego de novo no banco
                $rootScope.getUser()
                .then(function(){
                    PerguntaDB.all()
                    .then(function(d){
                        console.log(d);
                        $rootScope.listAsks = d;
                        $scope.myPerguntas = $rootScope.listAsks;

                    });

                    $scope.myPerguntas = $rootScope.listAsks;
                });
            }else {
                PerguntaDB.all()
                .then(function(d){
                    console.log(d);
                    $rootScope.listAsks = d;
                    $scope.myPerguntas = $rootScope.listAsks;
                });


            }

        });


        $scope.aprove = function(question){
            console.log(question);
            question.status = true;
            var pergunta = new Pergunta(question);
            PerguntaDB.update(pergunta);



            window.io.emit('questionForPresenter',pergunta);
        }

        $scope.reprove = function(question){
            question.status = false;
            var pergunta = new Pergunta(question);
            PerguntaDB.update(pergunta);

        }

        $scope.doAsk = function(){

            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="pergunta.question">',
                cssClass: 'popup-pergunta',
                title: 'Pergunta',
                subTitle: 'Escreve aqui a sua pergunta',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Publicar</b>',
                        type: 'button-positive',
                        onTap: function(e) {


                            if (!$scope.pergunta.question) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.pergunta;
                            }
                        }
                    },
                    { text: 'Cancelar' },
                ]
            });

            myPopup.then(function(res) {
                var data = {
                    from: $rootScope.user,
                    question : res.question,
                    date: new Date(),
                    status: null
                };


                var pergunta = new Pergunta(data);
                //console.log(pergunta);

                PerguntaDB.insert(pergunta)
                .then(function(d){
                    console.log(d);
                    data._id = d.id;
                    data._rev = d.rev;
                    $rootScope.listAsks.push(data);
                    $rootScope.$apply();

                    //Manda para o websocket as perguntas
                    io.emit('ask',data);
                });



            });
        }


        $scope.getClass = function(pergunta){
            if($scope.isModerator & pergunta.status != undefined){
                return pergunta.status ?  'aproved' : 'reproved';
            }
        }








}]);
