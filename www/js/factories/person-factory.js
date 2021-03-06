/**
 * Created by guilherme on 14/04/16.
 */
window.app.factory('Person',function(PersonDB,host,$http){


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
        createFrom: function(obj){
            return new Person(obj);
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
                                //Tenta inserir
                                PersonDB.insert(user)
                                    .then(function(data){
                                        console.log(data);
                                    })
                                    .catch(function(err){
                                        console.log(err);
                                    });
                            }else {
                                console.log("update");
                                user._id = result[0].id;


                                console.log(result);
                                console.log(user);
                                PersonDB.update(user)
                                    .then(function(data){
                                        console.log(data);
                                    })
                                    .catch(function(err){
                                        console.log(err);
                                    });
                            }

                            //Se existir update...
                        })
                        .catch(function(err){
                            reject(Error(err));
                        });


                }else {
                    reject(Error("É preciso de uma instancia Person"));
                }
            });

        },

        remove: function(doc_id){
          return PersonDB.remove(doc_id);
        },
        search : function(searchKey){
           return PersonDB.search(searchKey);
        }
    }
});
