/**
 * Created by guilherme on 04/05/16.
 */
window.app.factory('PersonDB',function($rootScope){
    var table = {
        name: Person.name
    };

    return {
        insert: function(person){
            return new Promise(function(resolve,reject){
                console.log(person.toJSON());
                if(person instanceof Person){
                    var object = {
                        access_token    : person.getToken(),
                        _id             : new Date().getTime()+"", //Gera um id
                        user_id         :person.getUserId(),
                        login           :person.getLogin(),
                        email           :person.getEmail(),
                        name            :person.getName(),
                        password        :person.getPassword(),
                        //role            :person.getRole()
                    };



                    console.log(object);

                    $rootScope.pdb.put(object,function(err,result){
                        if(!err){
                            resolve(result);
                        }else {
                            reject(err);
                        }
                    })
                }else {
                    reject(Error("É preciso uma instancia de Person"));
                }

            });

        },
        search: function(search){
            window.q = search;
            return new Promise(function(resolve,reject){
                //Function para filtrar os registros
                var map = function(person){
                    var regex,searchKey;
                    searchKey = window.q;

                    regex = new RegExp(searchKey,"i");

                    if(
                        person.name.match(regex)  || //Se Algum dos atributos for igual ao passado então atende
                        person.login.match(regex) || // Ex; Where name like %searchkey% OR login like %searchkey%
                        person.email.match(regex) ||
                        person._id.match(regex)
                    ){
                        emit(person._id,{ //O primeiro argumento informa o ID do objeto, e o segundo, é como ele deve ser mostrado
                            _id  : person._id,
                            user_id : person.user_id,
                            login : person.login,
                            email : person.email,
                            name : person.name,
                            password : person.password,
                            role : person.role
                        });
                    }
                };

                $rootScope.pdb.query(map,function(err,response){
                    if(err){
                        reject(Error(err));
                    }

                    //Se houver um resultado para a consulta
                    if(response){
                        var df, rows, nl, results;

                        /* Rewrite the response so that our object has the
                         correct structure for our addrow function. */
                        results = response.rows.map(function(r) {
                            r.doc = r.value;
                            delete r.value;
                            return r;
                        });

                        resolve(results);
                    }
                });


            });






        }
    }
})