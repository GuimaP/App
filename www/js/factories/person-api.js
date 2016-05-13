/**
 * Created by guilherme on 14/04/16.
 */
window.app.factory('PersonAPI',function(PersonDB,host,$http){


    var roles = ["palestrante","moderador","participante"];

    return {
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
        }
    }
});
