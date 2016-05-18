/**
 * Created by guilherme on 09/05/16.
 */
/**
 * Created by guilherme on 04/05/16.
 */
window.app.factory('PerguntaDB',function($rootScope){
    var type = {
        name: "Pergunta"
    };

    return {
        all: function(){

            var user_id = $rootScope.user.user_id;
            window.peguntaUserId = user_id;
            return new Promise(function(resolve,reject){
                //Function para filtrar os registros
                var map = function(pergunta){




                    //Se o objeto n tiver o _id, então ele ja foi removido
                    if(pergunta._id != undefined) {

                        if (pergunta.type == "Pergunta") {
                            if(pergunta.owner == peguntaUserId){
                                emit(pergunta._id, pergunta);
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
                            r = r.value;
                            delete r.value;
                            return r;
                        });

                        resolve(results);
                    }
                });


            });

        },

        insert: function(pergunta){
            var user_id = $rootScope.user.user_id;

            return new Promise(function(resolve,reject){

                if(pergunta instanceof Pergunta){

                var object = {
                    _id: new Date().getTime() + "",
                    from : pergunta.from,
                    date : pergunta.date,
                    status : pergunta.status,
                    question : pergunta.question,
                    owner   : user_id,
                    type: type.name
                }



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
        update: function(pergunta){
            console.log(pergunta);
            return new Promise(function(resolve,reject){

                if(pergunta instanceof Pergunta){

                    console.log(pergunta);
                    console.log(pergunta._id,pergunta._rev);


                    $rootScope.pdb.get(pergunta._id).then(function(doc) {
                        console.log(doc);

                        doc._id = pergunta._id;
                        doc._rev = pergunta._rev;
                        doc.from = pergunta.from;
                        doc.date = pergunta.date;
                        doc.status = pergunta.status;
                        doc.question = pergunta.question;



                        return $rootScope.pdb.put(doc);
                    }).then(function(response) {
                        console.log(response);
                        resolve(response);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });




                    /*$rootScope.pdb.put(pergunta)
                    .then(function(result){
                        console.log(result);
                        resolve(result);


                    })
                    .catch(function(er){
                        console.log(er);
                        reject(er);
                    });*/
                }else {
                    reject(Error("É preciso uma instancia de Pergunta"));
                }

            });

        },
        search: function(search){
            window.pergunta = search;
            return new Promise(function(resolve,reject){
                //Function para filtrar os registros
                var map = function(pergunta){
                    var regex,searchKey;
                    searchKey = window.pergunta;
                    regex = new RegExp(searchKey,"i");



                    //Se o objeto n tiver o _id, então ele ja foi removido
                    if(pergunta._id != undefined) {

                        if (
                            pergunta.pergunta_id.match(regex) //Se Algum dos atributos for igual ao passado então atende
                            & pergunta.type == "Pergunta"
                        ) {
                            if(pergunta.owner == $rootScope.user.user_id) { //O registro tem que pertencer ao usuario
                                emit(pergunta._id, pergunta);
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