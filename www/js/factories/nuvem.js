/**
 * Created by guilherme on 14/04/16.
 */
window.app.factory('NuvemAPI',function(PersonDB,host,$http,$rootScope){

    return {
        send: function(word){
            return new Promise(function(resolve,reject){

                var config = {
                    url: host.url+"/api/tag",
                    data: word,
                    method: "POST",
                    headers: {
                        'Authorization' : $rootScope.user.access_token,
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
