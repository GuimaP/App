/**
 * Created by guilherme on 09/05/16.
 */
/**
 * Created by guilherme on 04/05/16.
 */
window.app.factory('MessageDB',function($rootScope){
    var type = {
        name: Message.name
    };

    return {
        insert: function(message){
            return new Promise(function(resolve,reject){

                if(message instanceof Message){

                    var object = {
                        type: type.name,
                        _id  : new Date().getTime() + "",
                        owner: message.owner,
                        from: message.from,
                        to: message.to,
                        message: message.message,
                        conversationWith: message.conversationWith,
                        data: message.data
                    };

                    $rootScope.pdb.put(object,function(err,result){
                        if(!err){
                            resolve(result);
                        }else {
                            reject(err);
                        }
                    })
                }else {

                    reject(Error("É preciso uma instancia de " + type));
                }

            });

        },
        update: function(message){
            return new Promise(function(resolve,reject){

                if(message instanceof Person){



                    $rootScope.pdb.put(message,function(err,result){
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
                var map = function(message){
                    var regex,searchKey;
                    searchKey = window.q;
                    regex = new RegExp(searchKey,"i");



                    //Se o objeto n tiver o _id, então ele ja foi removido
                    if(message._id != undefined) {

                        if (
                            message.message.match(regex) //Se Algum dos atributos for igual ao passado então atende

                        ) {
                            emit(message._id, { //O primeiro argumento informa o ID do objeto, e o segundo, é como ele deve ser mostrado
                                _id: message._doc_id_rev,
                                _rev: message._rev,
                                user_id: message.user_id,
                                access_token  : message.access_token,
                                login: message.login,
                                photo: message.photo,
                                email: message.email,
                                name: message.name,
                                password: message.password,
                                type: message.type,
                                role: message.role
                            });
                        }
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

        },
        searchConversation: function(user_id,owner_id){

            window.owner_conversation_id = owner_id;
            window.currentType = type.name;
            window.user_id = user_id;
            console.log(user_id + ' e ' + owner_id + " ==> " +  window.q);

            return new Promise(function(resolve,reject){

                //Function para filtrar os registros
                var map = function(message){
                    var regex,searchKey;
                    searchKey = window.user_id;
                    regex = new RegExp(searchKey,"i");
                    console.log("===> " +window.q);



                    //Se o objeto n tiver o _id, então ele ja foi removido
                    if(message._id != undefined) {
                        console.log(message.type + " == " + currentType);
                        if(message.type == currentType){

                            console.log(message.conversationWith.user_id + " == " + searchKey + " && " + message.owner.user_id + " == " + window.owner_conversation_id);

                            if (
                                (message.conversationWith.user_id == searchKey)
                                &&
                                message.owner.user_id == window.owner_conversation_id

                            ) {
                                emit(message._id, message);
                            }
                        }

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

        },
        remove : function(doc_id){


            return new Promise(function(resolve, reject){


                $rootScope.pdb.get(doc_id)
                    .then(function(d){



                        $rootScope.pdb.remove(d);

                        resolve(d);
                    }).catch(function(err){


                    reject(err);

                });






            });

        }
    }
})