/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('HomeCtrl',['$scope','$rootScope','Person','PersonDB',function($scope,$rootScope,Person,PersonDB){







  $scope.opcoes = [
    {name:"Meu Perfil",link:"#/app/perfil",icon: "img/ionic.png"},
    {name:"Participantes",link:"", icon: "img/ionic.png"},
    {name:"Agenda",link:"", icon: "img/ionic.png"},
    {name:"Apresentação",link:"#/app/apresentacao",icon: "img/ionic.png"},
    {name:"Palestrantes",link:"",icon:"img/ionic.png"},
    {name:"Votação interativa",link:"#/app/quiz",icon:"img/ionic.png"},
    {name:"Perguntas",link:"#/app/perguntas",icon:"img/ionic.png"},
    {name:"Mensagens",link:"#/app/chat",icon:"img/ionic.png"},
    {name:"Galeria de Fotos",link:"",icon:"img/ionic.png"},
    //{name:"Avaliação",link:"",icon:"img/ionic.png"},
  ]

}]);
