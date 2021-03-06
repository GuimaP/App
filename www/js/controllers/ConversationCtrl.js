window.app.controller('ConversationCtrl',[
    '$scope','$rootScope','$stateParams','MessageDB','$ionicScrollDelegate','$timeout',
    function ($scope,$rootScope,$stateParams,MessageDB,$ionicScrollDelegate,$timeout) {
        var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');



        //Evento que da um update nas conversas do banco quando tem uma nova interação
        window.io.on('updateConversation',function(d){

            console.log(d);
            console.log($rootScope.messages);

            var quantForDecrease = 0;

            for(var i = 0;i < $rootScope.messages.length; i++){
                var msg = $rootScope.messages[i];
                if(msg.from.user_id == $rootScope.currentConversation.user_id){
                    $rootScope.messages.splice(i,1);
                    break;
                }
            }

            console.log($scope.currentConversation.user_id);
            console.log($rootScope.user.user_id);

            MessageDB.searchConversation($scope.currentConversation.user_id,$rootScope.user.user_id)
                .then(function(result){
                    $scope.messages = result;
                    $scope.$apply();
                    $timeout(function() {
                        viewScroll.scrollBottom();
                    }, 0);
                    //$(".messages ion-scroll").animate({ scrollTop: $(document).height() }, "slow");
                });

        });

        $scope.$on("$ionicView.beforeEnter", function(event, data){
            $timeout(function() {
                viewScroll.scrollBottom();
            }, 0);
            var index = $stateParams.index;

            //Subtraio o count dessa conversa do numero de mensagens recebidas do menu superior
            $scope.messages.splice(0,$rootScope.conversas[index].count);
            $rootScope.conversas[index].count = 0;
            $rootScope.currentConversation = $rootScope.conversas[index];

            $scope.messages = $scope.currentConversation.messages == undefined ? [] : $scope.currentConversation.messages;
            $rootScope.currentConversation.messages = $scope.messages;

            console.log($scope.currentConversation.user_id);
            console.log($rootScope.user.user_id);

            MessageDB.searchConversation($scope.currentConversation.user_id,$rootScope.user.user_id)
                .then(function(result){
                    $scope.messages = result;
                    console.log(result);
                    $scope.$apply();
                    $timeout(function() {
                        viewScroll.scrollBottom();
                    }, 0);
                });

           /* MessageDB.searchConversation($scope.currentConversation.user_id,$rootScope.user.user_id)
                .then(function(result){
                    $scope.messages = result;
                    console.log(result);
                    $scope.$apply();
                });*/

            //$(".messages ion-scroll").animate({ scrollTop: $(document).height() }, "slow");

        });



        $scope.sendMessage  = function(){
            var obj = JSON.parse(JSON.stringify($rootScope.user));
            var msg = {
                    to: {
                        user_id: $scope.currentConversation.user_id,
                        name: $scope.currentConversation.name
                    },
                    from: {
                        user_id: $rootScope.user.user_id,
                        name: $rootScope.user.name
                    }, //Meu usuario logado
                    message: this.message
            };


            var message = new Message({
                owner: {
                    user_id: $rootScope.user.user_id,
                    name: $rootScope.user.name
                },
                from: {
                    user_id: $rootScope.user.user_id,
                    name: $rootScope.user.name
                },
                conversationWith: {
                    user_id: $scope.currentConversation.user_id,
                    name: $scope.currentConversation.name
                },
                to: {
                    user_id: $scope.currentConversation.user_id,
                    name: $scope.currentConversation.name
                },
                data : new Date(),
                message: this.message
            });
            //console.log(message);
            console.log(msg);
            /*

            */

            MessageDB.insert(message)
                .then(function(d){
                    console.log("Persisitiu");
                    console.log(message);

                    console.info(d);

                })
                .catch(function(err){
                    console.log(err);
                });

            this.message = "";


            console.info(msg);


            //io.emit('message',this.message);
            window.io.emit('message',msg);
        }

    }]);