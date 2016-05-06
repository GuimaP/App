window.app.factory('Apresentacao',function(host,$http,$rootScope){
    return {
        all: function(){
            /*console.log($rootScope.user);
            console.log($rootScope.user.access_token);*/

            return new Promise(function(resolve,reject){
                //$http.defaults.headers.common['Authorization'] = $rootScope.user.access_token;
                $http({
                    url: host.url+"/api/presentation",
                    method: "GET"

                }).success(function(d){
                    resolve(d);
                }).error(function(er){
                    reject(er);
                });
            });
        }
    }
})