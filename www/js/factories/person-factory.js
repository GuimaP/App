/**
 * Created by guilherme on 14/04/16.
 */
window.app.factory('Person',function(){


   var roles = ["palestrante","moderador","participante"];

   return {
        createNew: function(){
            return new Person(null,null,null,0);
        },
        createFrom: function(nome,email,senha){
            return new Person(nome,email,senha)
        },
        getRole: function(roleName){
             return roles.indexOf(roleName);

        }
    }
});
