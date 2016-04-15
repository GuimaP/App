window.app.factory('Auth',[function(){
  return {
    check: function(user){

      if(user instanceof Person){
          console.log(user.getUser());
          if(
            user.getUser() == "teste" &&
            user.getPassword() == "123"
          ){
            return true;
          }else {
            return false;
          }
      }else {
        throw "Parametro incorreto, somente do tipo Pessoa";
      }
    },
    isPalestrante(){

    }
  }
}]);
