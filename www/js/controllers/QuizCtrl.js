window.app.controller("QuizCtrl",
    ['$scope','$rootScope','Quiz',
        function($scope,$rootScope,Quiz){

            console.log(Quiz);
            $scope.$on("$ionicView.beforeEnter", function(event, data){
                Quiz.all()
                .then(function(d){
                    $scope.quizies = d.data.quiz;
                    console.log(d);
                })
                .catch(function(err){
                    console.log(err);
                });
            });

        }]);
