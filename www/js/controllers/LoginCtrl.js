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
                $rootScope.hasLogged = true;
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

                  console.log(data);
                  //Verifica se a api retornou um user
                  var userRemote;
                  if(data.data.client){
                      userRemote = data.data.client.user;
                  }else {
                      userRemote = data.data.user;
                  }





                  //Crio um objeto Role a partir do role do remoto
                  var role = new Role({
                      id : userRemote.role.role_id,
                      name: userRemote.role.role_name
                  });


                  //Salvo o objeto user na sessão
                  $rootScope.user = $scope.usuario;
                  $rootScope.user.setRole(role);
                  $rootScope.user.setToken(userRemote.access_token);


                    //Se houver um client no data, então eu pego a foto, name e lastname
                  if(data.data.client){
                      var client = data.data.client;

                      $rootScope.user.setPhoto(client.client_photo);
                      $rootScope.user.email = client.client_email;
                      $rootScope.user.initial_information = client.client_info;
                      $rootScope.user.name = client.client_name;
                      $rootScope.user.lastname = client.client_second_name;
                      $rootScope.user.setUserId(client.client_id);

                      $cookies.putObject("user",true);
                      $cookies.putObject("userData",$rootScope.user.toJSON());
                      $rootScope.hasLogged = true;

                      //Adiciono no BANCO
                      Person.insert($rootScope.user);

                      $state.go('app.home');


                  }else { //Não tem um client, então ele vai ser os valores normais
                      $rootScope.user.setUserId(userRemote.user_id);
                      $rootScope.user.setPhoto("img/ionic.png");
                      var sobrenome = userRemote.user_initial_information.substring(userRemote.user_initial_information.indexOf(' ')+1);
                      var nome = userRemote.user_initial_information.split(" ",1);
                      nome = nome.toString();

                      $rootScope.user.name = nome;
                      $rootScope.user.lastname = sobrenome;
                      $state.go("confirmacao");
                  }
                  console.log($rootScope.user);
                  //Define default image


                  /*






                  var sobrenome = userRemote.user_initial_information.substring(userRemote.user_initial_information.indexOf(' ')+1);
                  var nome = userRemote.user_initial_information.split(" ",1);
                  nome = nome.toString();

                  $rootScope.user.name = nome;
                  $rootScope.user.lastname = sobrenome;


                  $state.go("confirmacao");*/
              })
              .catch(function(err){
                  $scope.hide();
                  console.log(err);
                  console.error(err);
                  PopupFactory.error("Invalido","Verifique sua senha");
              });

            }
}]);
