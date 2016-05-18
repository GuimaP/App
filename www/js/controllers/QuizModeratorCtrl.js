window.app.controller('QuizModeratorCtrl',[
            '$scope','$rootScope','$stateParams','Quiz','QuizDB','PopupFactory',
    function ($scope,$rootScope,$stateParams,Quiz,QuizDB,PopupFactory) {

            $scope.quiz = {};
            $scope.questions = [];
            $scope.currentIndex = 0;



            $scope.questionSelected;

            $scope.$on("$ionicView.beforeEnter",function(data,event){
                console.log($rootScope.liveVotes);


            });

            $scope.createQuiz = function(){
                PopupFactory.criarQuiz($scope);
            }

            $scope.nextStep = function(){
                var i = 0;
                var size  =  $scope.quiz.questionsCount;

                //Se não a quantidade for a mesma que ja existe, então eu n deixo prosseguir
                if( $scope.questions.length == $scope.quiz.questionsCount){
                    return;
                }

                console.log($scope.questions.length > $scope.quiz.questionsCount);


                if($scope.questions.length > 0){
                    if($scope.quiz.questionsCount > $scope.questions.length){
                        var qtd = $scope.quiz.questionsCount - $scope.questions.length;
                        i = $scope.questions.length;
                        size = $scope.questions.length + qtd;
                    }
                }

                console.log(size);

                console.log($scope.quiz);
                for(i ; i < size; i++){
                    $scope.questions.push({
                        quiz_question_name: "Question " + (i+1),
                        quiz_question_answer : [{
                            quiz_question_answer_name: "",
                            quiz_question_answer_is_correct: false
                        }]
                    });
                }

                console.log($scope.questions);
            }

            $scope.selectQuestion = function(question,index){

                //Guarda a questão selcionada, para mostrar as alterantivas criadas
                $scope.questionSelected = true; //Indica que tem uma questao selecionada
                $scope.currentIndex = index;


                console.log($scope.questions);
                console.log($scope.currentQuestion);
            }

            $scope.addAnswer = function(){


                $scope.questions[$scope.currentIndex].quiz_question_answer.push({
                    quiz_question_answer_name: "",
                    quiz_question_answer_is_correct: false
                });

            }


            $scope.convertToLetter = function(number){
                return String.fromCharCode(65+number);
            }


            $scope.removeQuestion = function(index){
                $scope.questions.splice(index,1);


            }

            $scope.removeAnswer = function(index){
                console.log("entrou");
                $scope.questions[$scope.currentIndex].quiz_question_answer.splice(index,1);

            }

            $scope.saveQuiz = function(){
                //Criando o objeto de quiz
                console.log($scope.quiz);
                $scope.quiz.quiz_tag = 'votacao';
                Quiz.addAPI($scope.quiz);

            }


    }]);