/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('HomeCtrl',['$scope','$rootScope','Person','PersonDB','$ionicHistory','$ionicViewService',function($scope,$rootScope,Person,PersonDB,$ionicHistory,$ionicViewService){




    $rootScope.title = "Bem Vindo";
    console.log($rootScope.user);





    $scope.opcoesFirst = [
        {name:"Meu Perfil",link:"#/app/perfil",icon: "img/ionic.png"},
        {name:"Participantes",link:"#/app/participantes", icon: "img/ionic.png"},
        {name:"Agenda",link:"", icon: "img/ionic.png"},
        {name:"Apresentação",link:"#/app/apresentacao",icon: "img/ionic.png"},
        {name:"Palestrantes",link:"",icon:"img/ionic.png"},
        //{name:"Avaliação",link:"",icon:"img/ionic.png"},
        /* {name:"Votação interativa",link:"#/app/quiz",icon:"img/ionic.png"},
         {name:"Perguntas",link:"#/app/perguntas",icon:"img/ionic.png"},
         {name:"Mensagens",link:"#/app/chat",icon:"img/ionic.png"},
         {name:"Galeria de Fotos",link:"",icon:"img/ionic.png"},*/
    ];

    $scope.opcoesSecond = [
        {name:"Votação interativa",link:"#/app/quiz",icon:"img/ionic.png"},
        {name:"Perguntas",link:"#/app/perguntas",icon:"img/ionic.png"},
        {name:"Nuvem de Palavras",link:"#/app/nuvem",icon:"img/ionic.png"},
        {name:"Galeria de Fotos",link:"",icon:"img/ionic.png"},
    ];

}]);
