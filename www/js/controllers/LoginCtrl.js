/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('LoginCtrl',
  [
    '$scope','$state','PopupFactory','Person','Auth','$rootScope',
    function($scope,$state,PopupFactory,Person,Auth,$rootScope){

        //Create new instance of Person
        $scope.usuario = Person.createNew();



      //Checa se existe uma "sessão" ativa


      //Event for Auth.
      $scope.signin = function(){
          Auth.check($scope.usuario)
              .then(function(data){



                  //Pego o objeto usuario
                  var userRemote = data.data.user;

                  //Crio um objeto Role a partir do role do remoto
                  var role = new Role({
                      id : userRemote.role.role_id,
                      name: userRemote.role.role_name
                  });

                  $rootScope.user = $scope.usuario;
                  $rootScope.user.setRole(role);
                  $rootScope.user.setToken(userRemote.access_token);
                  $rootScope.user.setUserId(userRemote.user_id);



                  $state.go("app.home");
              })
              .catch(function(err){
                  console.log(err);
                  PopupFactory.error("Invalido","Verifique sua senha");
              });

      }
}]);
