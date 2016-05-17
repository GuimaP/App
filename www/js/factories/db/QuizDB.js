/**
 * Created by guilherme on 09/05/16.
 */
/**
 * Created by guilherme on 04/05/16.
 */
window.app.factory('QuizDB',function($rootScope){
    var type = {
        name: "Quiz"
    };

    return {
        all: function(){

            return new Promise(function(resolve,reject){
                //Function para filtrar os registros
                var map = function(quiz){




                    //Se o objeto n tiver o _id, então ele ja foi removido
                    if(quiz._id != undefined) {

                        if (quiz.type == "Quiz") {
                            emit(quiz._id, { //O primeiro argumento informa o ID do objeto, e o segundo, é como ele deve ser mostrado
                                _id: quiz._doc_id_rev,
                                _rev: quiz._rev,
                                quiz_id: quiz.quiz_id,
                                quiz: quiz.quiz
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

        insert: function(quiz_id,quiz){
            return new Promise(function(resolve,reject){

                /*if(QuizDB instanceof Message){*/

                    var object = {

                        _id  : new Date().getTime() + "",
                        quiz_id: quiz_id,
                        quiz: quiz,
                        type: type.name
                    };

                    $rootScope.pdb.put(object,function(err,result){
                        if(!err){
                            resolve(result);
                        }else {
                            reject(err);
                        }
                    })
               /* }else {

                    reject(Error("É preciso uma instancia de " + type));
                }*/

            });

        },
        update: function(message){
            return new Promise(function(resolve,reject){

                resolve(Error('not implemented'))

            });

        },
        search: function(search){
            window.quiz = search;
            return new Promise(function(resolve,reject){
                //Function para filtrar os registros
                var map = function(quiz){
                    var regex,searchKey;
                    searchKey = window.quiz;
                    regex = new RegExp(searchKey,"i");



                    //Se o objeto n tiver o _id, então ele ja foi removido
                    if(quiz._id != undefined) {

                        if (
                            quiz.quiz_id == searchKey //Se Algum dos atributos for igual ao passado então atende
                            & quiz.type == "Quiz"
                        ) {
                            emit(quiz._id, { //O primeiro argumento informa o ID do objeto, e o segundo, é como ele deve ser mostrado
                                _id: quiz._doc_id_rev,
                                _rev: quiz._rev,
                                quiz_id: quiz.quiz_id,
                                quiz: quiz.quiz
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