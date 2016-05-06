window.app.controller('ChatCtrl', function($scope,$rootScope,$state){
    $scope.myUser = $rootScope.user;
    $scope.messages = $rootScope.messages;


    window.io.emit('allUsers');

    window.io.on('receiveUsers',function(data){

        $rootScope.peoples = data;

        console.log($rootScope.peoples);
        $rootScope.$apply();
    });

    io.on('newUser',function(data){
        $rootScope.peoples = data;

        $rootScope.$apply();

    });

    io.on('updateConversation',function(data){
        //Recebe a mensagem e atualiza a conversa do dono.

        console.log(data);
        console.log($rootScope.peoples);
        console.log($rootScope.peoples.length);

        for(var i = 0; i < $rootScope.peoples.length; i++){
            var e = $rootScope.peoples[i];

            console.log(e);
            console.log(e.user_id + " ==  " + data.de.user_id);

            if(e.user_id == data.de.user_id){
                console.log("entro");
                console.log($rootScope.peoples[i].count);

                $rootScope.peoples[i].count = $rootScope.peoples[i].count+1;


                break;
            }
        }

        $rootScope.$apply();

    });


    $scope.selectUser = function(people){
        console.log(people);
        $rootScope.currentUser = people;
        $rootScope.users = $scope.peoples;
        $state.go("app.converstation",{ id: people.user_id});
    }




});
