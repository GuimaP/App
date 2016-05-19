/**
 * Created by guilherme on 09/05/16.
 */
/**
 * Created by guilherme on 04/05/16.
 */
window.app.factory('WordCloudDB',function($rootScope){
    var type = {
        name: WordCloud.name
    };

    return {
        myAll: function(){
            return new Promise(function(resolve,reject){


                window.wordUser = $rootScope.user.user_id;
                //Function para filtrar os registros
                var map = function(word){
                    var regex,searchKey;
                    searchKey = window.window.wordUser;
                    regex = new RegExp(searchKey,"i");





                    //Se o objeto n tiver o _id, então ele ja foi removido
                    //Se Algum dos atributos for igual ao passado então atende
                    if(word._id != undefined & word.type == 'WordCloud' ) {

                        if (
                            word.client == searchKey
                        ) {

                            emit(word._id,word);
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
                            console.log(r.value);
                            r = r.value;
                            delete r.value;
                            return r;
                        });

                        resolve(results);
                    }
                });


            });
        },
        insert: function(word){
            return new Promise(function(resolve,reject){

                if(word instanceof WordCloud){

                    var object = {
                        type: type.name,
                        _id  : new Date().getTime() + "",
                        tag_name :word.tag_name,
                        tag_status: word.tag_status,
                        tag_id: word.tag_id,
                        client: word.client
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
        update: function(word){
            return new Promise(function(resolve,reject){

                if(word instanceof WordCloud){



                    $rootScope.pdb.put(word,function(err,result){
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
            window.qWord = search;
            return new Promise(function(resolve,reject){
                //Function para filtrar os registros
                var map = function(word){
                    var regex,searchKey;
                    searchKey = window.qWord;
                    regex = new RegExp(searchKey,"i");



                    //Se o objeto n tiver o _id, então ele ja foi removido
                    if(word._id != undefined) {

                        if (
                            word.word.match(regex) //Se Algum dos atributos for igual ao passado então atende

                        ) {
                            emit(word._id, word);
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
                            r = r.value;
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