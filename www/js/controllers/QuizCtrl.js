window.app.controller("QuizCtrl",
    ['$scope','$rootScope','Quiz','$ionicSlideBoxDelegate',
        function($scope,$rootScope,Quiz,$ionicSlideBoxDelegate){


            $scope.$on('ngRepeatFinishedSlider', function(ngRepeatFinishedEvent) {
                $ionicSlideBoxDelegate.update();
            });

            $scope.$on("$ionicView.afterLeave", function(event, data){
                $rootScope.canDrag = true;
            })
            $scope.$on("$ionicView.beforeEnter", function(event, data){
                $rootScope.canDrag = false;

                /*Quiz.all()
                .then(function(d){
                    //var quizies = d.data.quiz;
                    var quizies = d.data.quiz_question_answer;
                    var questions = [];
                    console.log(d);

                    for(var i=0; i < quizies.length; i++){
                        var myCurrentQuiz = quizies[i].quiz_question.quiz;

                        console.log(myCurrentQuiz);

                        for(var k = 0; k < quizies.length; k++){
                            var quizItem = quizies[k].quiz_question.quiz;
                            console.log(quizItem.quiz_id + "==" + myCurrentQuiz.quiz_id);
                            //se o quiz atual for igual ao quiz selecionadao
                            if(quizItem.quiz_id == myCurrentQuiz.quiz_id){

                                //Verifico se tem o atributo de questoes como array
                                if(myCurrentQuiz.questions == undefined){
                                    myCurrentQuiz.questions = []; //Se não houver crio um
                                }
                                var index = myCurrentQuiz.questions.inArray(quizies[k].quiz_question,"quiz_question");
                                if(index == -1) {
                                    //E adiciono a questão dentro do quiz atual
                                    myCurrentQuiz.questions.push(quizies[k].quiz_question);
                                }
                            }
                        }
                        questions.push(myCurrentQuiz);
                    }

                    //Para cada Quiz eu pesquiso a perguntas dele....


                    console.log(questions);
                    console.log($scope.quizies);
                })
                .catch(function(err){
                    console.log(err);
                });*/
            });

            $scope.slideHasChanged = function(index){
                $scope.slideIndex = index;
            }

        }]);
