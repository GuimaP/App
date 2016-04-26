/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('HomeCtrl',['$scope','Person',function($scope,Person){



  $scope.opcoes = [
    {name:"Conograma",link:""},
    {name:"Enviar Palavra",link:""},
    {name:"Conteudo das apresentações",link:""},
    {name:"Anotaões",link:""},
    {name:"Nuvem de palavras",link:"#/app/nuvem"}
  ]

}]);
