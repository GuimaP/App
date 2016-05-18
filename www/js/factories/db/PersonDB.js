/**
 * Created by guilherme on 04/05/16.
 */
window.app.factory('PersonDB',function($rootScope){
    var type = {
        name: Person.name
    };
    window.type = type;

    return {
        insert: function(person){
            return new Promise(function(resolve,reject){
                console.log(person.toJSON());
                console.log(person);
                if(person instanceof Person){

                    var object = {
                        type                        : type.name,
                        access_token                : person.access_token,
                        photo                       : person.photo,
                        user_id                     : person.user_id,
                        login                       : person.login,
                        email                       : person.email,
                        name                        : person.name,
                        password                    : person.password,
                        lastname                    : person.lastname,
                        user_initial_information    : person.user_initial_information,
                        photoPath                   : person.photoPath,
                        role            :{
                            name            : person.role.name,
                            id              : person.role.id
                        }
                    };





                    console.log(object,true);

                    $rootScope.pdb.post(object,function(err,result){
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
        update: function(person){
            return new Promise(function(resolve,reject){

                if(person instanceof Person){

                    console.log(person);

                    $rootScope.pdb.put(person,function(err,result){
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



                    //Se o objeto n tiver o _id, então ele ja foi removido
                    if(person._id != undefined && person.type == type.name) {


                        if (
                            person.name.match(regex) || //Se Algum dos atributos for igual ao passado então atende
                            person.login.match(regex) || // Ex; Where name like %searchkey% OR login like %searchkey%
                            person.user_id == searchKey ||
                            person.type.match(regex)
                        ) {
                            emit(person._id, { //O primeiro argumento informa o ID do objeto, e o segundo, é como ele deve ser mostrado
                                _id                         : person._id,
                                _rev                        : person._rev,
                                user_id                     : person.user_id,
                                access_token                : person.access_token,
                                login                       : person.login,
                                photo                       : person.photo,
                                email                       : person.email,
                                name                        : person.name,
                                password                    : person.password,
                                type                        : person.type,
                                role                        : person.role,
                                lastname                    : person.lastname,
                                user_initial_information    : person.user_initial_information,
                                photoPath                   : person.photoPath,
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
        update: function(person){
            console.log(person);
            return new Promise(function(resolve,reject){

                if(person instanceof Person){

                    console.log(person);
                    console.log(person._id,person._rev);


                    $rootScope.pdb.get(person._id).then(function(doc) {
                        console.log(doc);

                        console.log(person);

                        doc._id                         = person._id;
                        doc._rev                        = person._rev;
                        doc.user_id                     = person.user_id;
                        doc.user_id                     = person.user_id;
                        doc.access_token                = person.access_token;
                        doc.login                       = person.login;
                        doc.photo                       = person.photo;
                        doc.email                       = person.email;
                        doc.name                        = person.name;
                        doc.password                    = person.password;
                        doc.type                        = person.type;
                        doc.role                        = person.role;
                        doc.lastname                    = person.lastname;
                        doc.user_initial_information    = person.user_initial_information;
                        doc.photoPath                   = person.photoPath;

                        console.log(doc);


                        return $rootScope.pdb.put(doc);
                    }).then(function(response) {
                        console.log(response);
                        resolve(response);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });


                }else {
                    reject(Error("É preciso uma instancia de Pergunta"));
                }

            });
        },
        remove : function(doc_id){
            console.log('ae');

            return new Promise(function(resolve, reject){
                console.log(doc_id);

                $rootScope.pdb.get(doc_id)
                    .then(function(d){
                        console.log(d);
                        console.log(doc_id);

                        $rootScope.pdb.remove(d);

                        resolve(d);
                    }).catch(function(err){
                        console.log(err);

                        reject(err);

                    });






            });

        }
    }
})