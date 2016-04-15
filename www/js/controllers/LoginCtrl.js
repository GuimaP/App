/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('LoginCtrl',
  [
    '$scope','$state','PopupFactory','Person','Auth',


    function($scope,$state,PopupFactory,Person,Auth){
      $scope.usuario = Person.createNew();



      //Checa se existe uma "sessão" ativa.


      $scope.signin = function(){

        if(Auth.check($scope.usuario)){
          $state.go("app.home");
        }else {
           PopupFactory.error("Invalido","Verifique sua senha");
        }

      }
}]);
