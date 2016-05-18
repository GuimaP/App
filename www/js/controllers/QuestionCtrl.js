window.app.controller('QuestionCtrl',[
    '$scope','$rootScope','$stateParams','MessageDB','$ionicScrollDelegate','$timeout','$stateParams','$ionicSlideBoxDelegate','Quiz','QuizDB',
    function ($scope,$rootScope,$stateParams,MessageDB,$ionicScrollDelegate,$timeout,$stateParams,$ionicSlideBoxDelegate,Quiz,QuizDB) {
        var answers = [];


        $scope.$on("$ionicView.beforeEnter", function(event, data){
            answers = [];
            $rootScope.canDrag = false;
            $scope.saveButton = false;


            var index = $stateParams.index;
            $scope.quiz = $rootScope.allQuiz[index];
            console.log($scope.quiz);

            $scope.total = $scope.quiz.quiz_question.length;

            $scope.slideIndex = 0;

            console.log($rootScope.canDrag);
        });

        $scope.$on("$ionicView.beforeLeave", function(event, data){
            $rootScope.canDrag = true;
        });


        $scope.disableSwipe = function() {
            //$ionicSlideBoxDelegate.enableSlide(false);
        };




        $scope.slideHasChanged = function(index){
            $scope.slideIndex = index;
        }

        $scope.convertToLetter = function(number){
            return String.fromCharCode(65+number);
        }

        $scope.select = function(answer,question){


            //Remove das questoes anteriores, a class selected.
            for(var i = 0; i < question.quiz_question_answer.length; i++){
                if(question.quiz_question_answer[i].class != undefined & question.quiz_question_answer[i].class == 'selected'){
                    question.quiz_question_answer[i].class = "";
                    break;
                }
            }
            answer.class = 'selected';

            console.log(answers);
            console.log($scope.slideIndex,$scope.slideIndex < ($scope.total - 1));




            //Procura no array de respostas, se existe uma pergunta selecionada, se sim substitui
            for(var i =0; i < answers.length; i++){
                //Se existir uma pergunta cadastrada,
                if(answers[i].question.quiz_question_id == question.quiz_question_id){
                    console.log("ae");
                    answers.splice(i,1); //Remove
                    break;
                }
            }

            console.log(answers.length);

            //Objeto de resposta
            var obj = {
                question: question,
                answer : answer
            };
            answers.push(obj);

            if(answers.length == $scope.total){
                $scope.saveButton = true;
            }else {
                $scope.saveButton = false;
            }

            if($scope.slideIndex < ($scope.total - 1)){

                $ionicSlideBoxDelegate.next();
            }

            console.log($scope.saveButton);


        }

        $scope.submeterRespostas = function(){
            console.log(answers.length);
            //Envia todas as respostas para a API
            for(var i =0; i < answers.length; i++){
                Quiz.answer(answers[i].answer.quiz_question_answer_id)
                    .then(function(d){
                        console.log(d);

                    });

            }
            console.log(answers);

            //Salva essa question no banco, para identificar que ja foi respondida.
            var answersToPersist = [];

            for(var i =0; i < answers.length; i++){
                question = answers[i].question;
                question.answer = answers[i].answer;
                answersToPersist.push(question);

            }
            var quiz = {
                quiz: $scope.quiz,
                questions: answersToPersist,
                from : $rootScope.user
            };
            QuizDB.insert(quiz.quiz.quiz_id,quiz);

        }







    }]);