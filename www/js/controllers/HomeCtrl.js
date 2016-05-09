/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('HomeCtrl',['$scope','$rootScope','Person','PersonDB',function($scope,$rootScope,Person,PersonDB){



  PersonDB.search("Person")
      .then(function(data){
        if(data.length > 0){
          window.io.emit('connectUser',$rootScope.user);
        }

        $state.go('app.home');
      })
      .catch(function(err){
        console.log(err);
      });



  $scope.opcoes = [
    {name:"Meu Perfil",link:"#/app/perfil",icon: "/img/ionic.png"},
    {name:"Participantes",link:"", icon: "/img/ionic.png"},
    {name:"Agenda",link:"", icon: "/img/ionic.png"},
    {name:"Apresentação",link:"#/app/apresentacao",icon: "/img/ionic.png"},
    {name:"Palestrantes",link:"",icon:"/img/ionic.png"},
    {name:"Votação interativa",link:"",icon:"/img/ionic.png"},
    {name:"Perguntas",link:"#/app/quiz",icon:"/img/ionic.png"},
    {name:"Galeria de Fotos",link:"",icon:"/img/ionic.png"},
    {name:"Avaliação",link:"",icon:"/img/ionic.png"},
  ]

}]);
