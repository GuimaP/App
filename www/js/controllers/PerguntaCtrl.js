/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('PerguntaCtrl',
        ['$scope','$rootScope','Person','PersonDB','$ionicPopup',
            function($scope,$rootScope,Person,PersonDB,$ionicPopup){


                $scope.pergunta = {};
                $scope.myPerguntas = [
                    {desc: "1"},
                    {desc: "2"},
                    {desc: "3"},
                    {desc: "4"},
                    {desc: "5"},
                    {desc: "6"},
                    {desc: "7"},
                    {desc: "8"},
                    //{desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur mauris libero, vitae fermentum odio mollis ac. Proin imperdiet finibus faucibus. Maecenas quis commodo dui. Fusce at feugiat eros. Mauris magna erat, egestas ac lobortis ac, tincidunt et elit. Ut iaculis odio gravida ante semper semper ac eget neque. In vestibulum vitae est eu tempus. Aliquam ornare semper sapien, vel dapibus urna fermentum non. Phasellus id leo odio. "},
                    /*{desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur mauris libero, vitae fermentum odio mollis ac. Proin imperdiet finibus faucibus. Maecenas quis commodo dui. Fusce at feugiat eros. Mauris magna erat, egestas ac lobortis ac, tincidunt et elit. Ut iaculis odio gravida ante semper semper ac eget neque. In vestibulum vitae est eu tempus. Aliquam ornare semper sapien, vel dapibus urna fermentum non. Phasellus id leo odio. "},
                    {desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur mauris libero, vitae fermentum odio mollis ac. Proin imperdiet finibus faucibus. Maecenas quis commodo dui. Fusce at feugiat eros. Mauris magna erat, egestas ac lobortis ac, tincidunt et elit. Ut iaculis odio gravida ante semper semper ac eget neque. In vestibulum vitae est eu tempus. Aliquam ornare semper sapien, vel dapibus urna fermentum non. Phasellus id leo odio. "},
                    {desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur mauris libero, vitae fermentum odio mollis ac. Proin imperdiet finibus faucibus. Maecenas quis commodo dui. Fusce at feugiat eros. Mauris magna erat, egestas ac lobortis ac, tincidunt et elit. Ut iaculis odio gravida ante semper semper ac eget neque. In vestibulum vitae est eu tempus. Aliquam ornare semper sapien, vel dapibus urna fermentum non. Phasellus id leo odio. "},
                    {desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur mauris libero, vitae fermentum odio mollis ac. Proin imperdiet finibus faucibus. Maecenas quis commodo dui. Fusce at feugiat eros. Mauris magna erat, egestas ac lobortis ac, tincidunt et elit. Ut iaculis odio gravida ante semper semper ac eget neque. In vestibulum vitae est eu tempus. Aliquam ornare semper sapien, vel dapibus urna fermentum non. Phasellus id leo odio. "},
                    {desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur mauris libero, vitae fermentum odio mollis ac. Proin imperdiet finibus faucibus. Maecenas quis commodo dui. Fusce at feugiat eros. Mauris magna erat, egestas ac lobortis ac, tincidunt et elit. Ut iaculis odio gravida ante semper semper ac eget neque. In vestibulum vitae est eu tempus. Aliquam ornare semper sapien, vel dapibus urna fermentum non. Phasellus id leo odio. "},*/
                ];


    $scope.$on("$ionicView.beforeEnter", function(event, data){
       
    });

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
                date: new Date()
            };

            console.log(data);
            //Manda para o websocket as perguntas
            io.emit('ask',data);

        });
    }







}]);
