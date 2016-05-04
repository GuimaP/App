/**
 * Created by guilherme on 14/04/16.
 */
window.app.factory('Person',function(PersonDB){


   var roles = ["palestrante","moderador","participante"];

   return {
        createNew: function(){
            return new Person({
                nome: null,
                login: null,
                email: null,
                password: null,
                role: new Role({id:0, name: null})
            });
        },
        createFrom: function(nome,email,senha,role){
            return new Person({
                nome: nome,
                login: nome,
                email: email,
                password: senha,
                role: role
            })
        },
        getRole: function(roleName){
             return roles.indexOf(roleName);

        },
        insert: function(user){
            return new Promise(function(resolve,reject){
                console.log(user);
                if(user instanceof Person){

                    //Verifica se existe um user com aquele login no banco
                    PersonDB.search(user.getLogin())
                        .then(function(result){
                            console.log(result);
                            //Se n existir insere
                            if(result.length == 0){
                                alert("nda");
                                PersonDB.insert(user)
                                    .then(function(data){
                                        console.log(data);
                                    })
                                    .catch(function(err){
                                        console.log(err);
                                    });
                            }else {
                                console.log("update");
                            }

                            //Se existir update...
                        })
                        .catch(function(err){
                            console.log(err);
                        });


                }else {
                    reject(Error("É preciso de uma instancia Person"));
                }
            });

        },
        search : function(searchKey){
           PersonDB.search(searchKey).
               then(function(d){
               console.log(d);
           });
        }
    }
});
