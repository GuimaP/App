window.app.factory('Auth',['host','$http',function(host,$http){
  return {
    check: function(user){
        return new Promise(function(resolve,reject){
            if(user instanceof Person){
                console.log(JSON.stringify(user));
                $http({
                    url: host.url+"/auth",
                    method: "POST",
                    data: JSON.stringify(user)
                }).success(function(data){
                    resolve(data);
                }).error(function(er){
                    console.log(er);

                    reject(er);
                });

            }else {
                reject(Error("Parametro incorreto, somente do tipo Pessoa"));
            }
        });


    }
  }
}]);
