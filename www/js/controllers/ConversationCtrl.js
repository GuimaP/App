window.app.controller('ConversationCtrl',[
    '$scope','$rootScope','$stateParams',
    function ($scope,$rootScope,$stateParams) {
        console.log($rootScope.users);

        if(!$rootScope.currentUser){
            for(var i = 0; i < $rootScope.users; i++){
                if($rootScope.users[i].user_id == $stateParams.id){
                    $rootScope.currentUser = $rootScope.users[i];
                    break;
                }
            }
        }
        $scope.user = $rootScope.currentUser;

        $scope.sendMessage  = function(){
            var msg = {
                    to: $rootScope.currentUser,
                    message: this.message
            };
            //io.emit('message',this.message);
            io.emit('message',msg);
        }

    }]);