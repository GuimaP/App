/**
 * Created by guilherme on 14/04/16.
 */
window.app.factory('PersonAPI',function(PersonDB,host,$http,$rootScope){


    var roles = ["palestrante","moderador","participante"];

    return {
        update: function(user){
            return new Promise(function(resolve,reject){

                var data = {
                    client_name: user.name,
                    client_second_name: user.lastname,
                    client_email:user.email,
                    client_photo: user.photo,

                };

                console.log(data);




                var config = {
                    url: host.url+"/api/client/"+user.user_id,
                    data: JSON.stringify(data),
                    method: "PUT",
                    headers: {
                        'Authorization' : user.access_token,
                        'Content-Type'  : 'application/json'
                    }

                };

                $http(config)
                    .success(function(d){
                        resolve(d);
                    })
                    .error(function(e){
                        reject(e);
                    });
            });
        },
        insert: function(user){
            return new Promise(function(resolve,reject){
                console.log(user);
                console.log(user.name);
                console.log(user.lastname);
                console.log(user.email);
                console.log(user.photo);


                var data = {
                    client_name: user.name,
                    client_second_name: user.lastname,
                    client_email:user.email,
                    client_photo: user.photo,
                    user : user.user_id
                };

                console.log(data);




                var config = {
                    url: host.url+"/api/client",
                    data: JSON.stringify(data),
                    method: "POST",
                    headers: {
                        'Authorization' : user.access_token,
                        'Content-Type'  : 'application/json'
                    }

                };

                $http(config)
                .success(function(d){
                    resolve(d);
                })
                .error(function(e){
                    reject(e);
                });
            });
        },
        allClients: function(){



            return new Promise(function(resolve,reject){
                if(!$rootScope.user){
                    $rootScope.getUser()
                        .then(function(user){
                            var config = {
                                url: host.url+"/api/client",
                                method: "GET",
                                headers: {
                                    'Authorization' : user.access_token,
                                    'Content-Type'  : 'application/json'
                                }

                            };

                            $http(config)
                                .success(function(d){
                                    console.log(d);
                                    resolve(d);
                                })
                                .error(function(e){
                                    console.log(e);
                                    reject(e);
                                });
                        });

                }else {
                    var config = {
                        url: host.url+"/api/client",
                        method: "GET",
                        headers: {
                            'Authorization' : $rootScope.user.access_token,
                            'Content-Type'  : 'application/json'
                        }

                    };

                    $http(config)
                        .success(function(d){
                            console.log(d);
                            resolve(d);
                        })
                        .error(function(e){
                            console.log(e);
                            reject(e);
                        });
                }

            });


        }
    }
});
