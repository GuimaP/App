window.app.controller("QuizCtrl",
    ['$scope','$rootScope','Quiz',
        function($scope,$rootScope,Apresentacao,Quiz){

            console.log(Quiz);

            Quiz.all()
                .then(function(d){
                    console.log(d);
                })
                .catch(function(err){
                    console.log(err);
                });
        }]);
