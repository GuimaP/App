/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('LoginCtrl',
  [
    '$scope','$state','PopupFactory','Person','Auth','$rootScope','$cookies','PersonDB','$ionicLoading',
    function($scope,$state,PopupFactory,Person,Auth,$rootScope,$cookies,PersonDB,$ionicLoading){



        //Create new instance of Person
        $scope.usuario = Person.createNew();



        //Checa se existe uma "sessão" ativa
        /*if($cookies.getObject('user') != null & $cookies.getObject('user') == true){

        }*/
        PersonDB.search("Person")
        .then(function(data){
            if(data.length > 0) {
                $rootScope.user = data[0];
                console.log($rootScope.user);

                $state.go('app.home');
            }
        })
        .catch(function(err){
            console.log(err);
        });


        //Event for Auth.
        $scope.signin = function(){
            console.log($scope.usuario);
            console.log(Auth);

            $scope.show();

            Auth.check($scope.usuario)
              .then(function(data){
                  $scope.hide();

                  //Pego o objeto usuario
                  var userRemote = data.data.user;

                  //Crio um objeto Role a partir do role do remoto
                  var role = new Role({
                      id : userRemote.role.role_id,
                      name: userRemote.role.role_name
                  });
                  //Salvo o objeto user na sessão
                  $rootScope.user = $scope.usuario;
                  $rootScope.user.setRole(role);
                  $rootScope.user.setToken(userRemote.access_token);
                  $rootScope.user.setUserId(userRemote.user_id);

                  //Define default image
                  $rootScope.user.setPhoto("img/ionic.png");

                  $state.go("confirmcao");
              })
              .catch(function(err){
                  $scope.hide();
                  console.log(err);
                  PopupFactory.error("Invalido","Verifique sua senha");
              });

            }
}]);
