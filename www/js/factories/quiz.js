window.app.factory('Quiz',['host','$http','$rootScope',function(host,$http,$rootScope){
    
    return {
        all: function(){


            return new Promise(function(resolve,reject){


                //$http.defaults.headers.common['Authorization'] = $rootScope.user.access_token;
                $http({
                    url: host.url+"/api/quiz-question-answer",
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
        },
        answer: function(answer_id) {


            return new Promise(function (resolve, reject) {

                var data = {
                    "client": $rootScope.user.user_id,
                    "quiz_question_answer": answer_id
                };
                //$http.defaults.headers.common['Authorization'] = $rootScope.user.access_token;
                $http({
                    url: host.url + "/api/client-quiz-response",
                    method: "POST",
                    //withCredentials: true,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }

                }).success(function (d) {
                    resolve(d);
                }).error(function (er) {
                    reject(er);
                });
            });
        },
        addAPI: function(quiz){
            return new Promise(function(resolve,reject){
                $http({
                    url: host.url + "/api/quiz",
                    method: "POST",
                    withCredentials: true,
                    data: quiz,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization' : $rootScope.user.access_token
                    }

                }).success(function (d) {
                    resolve(d);
                }).error(function (er) {
                    reject(er);
                });
            });
        }
    }
}]);