window.app.controller("QuizCtrl",

        function($scope,$rootScope,Quiz,$ionicSlideBoxDelegate,$state,QuizDB){
            console.log($state);
            var quizAnswered = [];

            window.io.on('updateQuiz',function(){
                //Carrega todos os quiz da API
                Quiz.all()
                    .then(function(d){
                        //var quizies = d.data.quiz;
                        //console.log(d);
                        $scope.quizies = d.data;
                        $rootScope.allQuiz = d.data;
                        $rootScope.$apply();
                        $scope.$apply();
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            });

            $scope.$on('ngRepeatFinishedSlider', function(ngRepeatFinishedEvent) {
                $ionicSlideBoxDelegate.update();
            });

            $scope.$on("$ionicView.afterLeave", function(event, data){
                $rootScope.canDrag = true;
            })
            $scope.$on("$ionicView.beforeEnter", function(event, data){
                $rootScope.canDrag = true;

                //Carrega todos os quiz ja respondido por ele
                QuizDB.all()
                .then(function(d) {
                    quizAnswered = d;
                });


                //Carrega todos os quiz da API
                Quiz.all()
                .then(function(d){
                    //var quizies = d.data.quiz;
                    //console.log(d);
                    $rootScope.allQuiz = d.data;
                    $scope.quizies = d.data;
                })
                .catch(function(err){
                    console.log(err);
                });
            });


            //Verifica se esse quiz ja foi respondido
            $scope.hasAlredyAnswered = function(id){
                for(var i = 0; i < quizAnswered.length; i++){
                    var item = quizAnswered[i].doc;

                    if(item.quiz_id == id){
                        console.log("Entrou");
                        return true;
                    }
                }

                return false;
            }


            $scope.select = function(index){
                $state.go('app.question',{index:index});
            }





        });
