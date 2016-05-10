window.app.factory('Quiz',['host','$http','$rootScope',function(host,$http,$rootScope){
    
    return {
        all: function(){
            console.log('asdasdasd');

            return new Promise(function(resolve,reject){


                //$http.defaults.headers.common['Authorization'] = $rootScope.user.access_token;
                $http({
                    url: host.url+"/api/quiz",
                    method: "GET",
                    //withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }

                }).success(function(d){
                    resolve(d);
                }).error(function(er){
                    reject(er);
                });
            });
        }
    }
}]);