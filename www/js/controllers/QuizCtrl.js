window.app.controller("QuizCtrl",
    ['$scope','$rootScope','Quiz','$ionicSlideBoxDelegate',
        function($scope,$rootScope,Quiz,$ionicSlideBoxDelegate){

            console.log(Quiz);

            $scope.$on("$ionicView.afterLeave", function(event, data){
                $rootScope.canDrag = true;
            })
            $scope.$on("$ionicView.beforeEnter", function(event, data){
                $rootScope.canDrag = false;

                Quiz.all()
                .then(function(d){
                    $scope.quizies = d.data.quiz;
                    console.log($scope.quizies);
                })
                .catch(function(err){
                    console.log(err);
                });
            });

            $scope.slideHasChanged = function(index){
                $scope.slideIndex = index;
            }

        }]);
