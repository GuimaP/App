window.app.controller('QuizModeratorCtrl',[
    '$scope','$rootScope','$stateParams','MessageDB','$ionicScrollDelegate','$timeout','$stateParams','$ionicSlideBoxDelegate','Quiz','QuizDB',
    function ($scope,$rootScope,$stateParams,MessageDB,$ionicScrollDelegate,$timeout,$stateParams,$ionicSlideBoxDelegate,Quiz,QuizDB) {
            $rootScope.pesquisa = [
                {
                        quiz_id: "",
                        quiz_nome: "",
                        questions : [{
                            question_id: "",
                            question_name: "",
                            answers: [
                                {
                                    answer_id: "",
                                    name: "",
                                    count: ""
                                }
                            ]
                        }]


                    }

            ];



            $scope.$on("$ionicView.beforeEnter",function(data,event){
                console.log($rootScope.liveVotes);

                for(var i = 0; i < $rootScope.liveVotes.length; i++){
                    console.log("1 ");
                    var quizies = $rootScope.liveVotes[i];
                    for(var k = 0; k <quizies.length; k++){
                        console.log("2 ");
                        var quiz = quizies[k];
                        getAnswersFromQuestion(quiz.questions);
                    }
                }



            });

            function getAnswersFromQuestion(questions){
                var answers = {};
                for(var i = 0; i = questions.length; i++){
                    var question = questions[i];

                    if(answers[question.answer.quiz_question_answer_id] == undefined){
                        answers[question.answer.quiz_question_answer_id] = {
                            cont : 1,
                            name: question.answer.quiz_question_answer_name
                        }
                    }else {
                        answers[question.answer.quiz_question_answer_id].name = question.answer.quiz_question_answer_name
                        answers[question.answer.quiz_question_answer_id].cont++;
                    }
                }

                console.log(answers);
            }







    }]);