window.app.factory('Auth',['host','$http',function(host,$http){
  return {
    check: function(user){
        return new Promise(function(resolve,reject){
            if(user instanceof Person){
                //console.log(JSON.stringify(user));
                $http({
                    url: host.url+"/auth",
                    method: "POST",
                    data: JSON.stringify(user),
                    headers: {
                        'Content-Type' : 'application/json'
                    }

                }).success(function(data){
                    //console.log(data);
                    resolve(data);
                }).error(function(er){
                    //console.log(er);

                    reject(er);
                });
                //console.log(user);
               /* var data = {
                    username: user.login,
                    password:user.password,
                    client_id:'1',
                    client_secret:'secret',
                    grant_type:'password'
                };

                $http({
                    url: host.url+"/oauth2/token",
                    method: "POST",
                    data: $.param(data),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}


                }).success(function(data){
                    console.log(data);
                    resolve(data);
                }).error(function(er){
                    console.log(er);

                    reject(er);
                });*/

            }else {
                reject(Error("Parametro incorreto, somente do tipo Pessoa"));
            }
        });


    }
  }
}]);
