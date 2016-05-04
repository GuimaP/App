/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('HomeCtrl',['$scope','$rootScope','Person','PersonDB',function($scope,$rootScope,Person,PersonDB){
  console.log($rootScope.user);
  //Verifica se existe um usuario no banco
  if(!$rootScope.user){
    //Pega do banco...
    console.log("nada");
  }else {
    //Usa o normal memo
  }

  PersonDB.search(3).then(function(data){
    console.log('ae');
    console.log(data);
  });
  /*Person.insert($rootScope.user)  ;*/


  $scope.opcoes = [
    {name:"Meu Perfil",link:"#/app/perfil",icon: ""},
    {name:"Participantes",link:"", icon: ""},
    {name:"Agenda",link:"", icon: ""},
    {name:"Apresentação",link:"",icon: ""},
    {name:"Palestrantes",link:"",icon:""},
    {name:"Votação interativa",link:"",icon:""},
    {name:"Perguntas",link:"",icon:""},
    {name:"Galeria de Fotos",link:"",icon:""},
    {name:"Avaliação",link:"",icon:""},
  ]

}]);
