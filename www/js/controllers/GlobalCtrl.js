window.app.controller('GlobalCtrl',
    ['$http','DB','$scope','$rootScope','$cookies','Person','$state','PersonDB','MessageDB','host','$ionicLoading',
    function($http,DB,$scope,$rootScope,$cookies,Person,$state,PersonDB,MessageDB,host,$ionicLoading){
    //Registrar os eventos aqui....
    window.io = io.connect(host.websocket);
        $rootScope.messages = [];
        $rootScope.canDrag = true;
        $rootScope.listAsks = [];
        $rootScope.title = "";
        $rootScope.subtitle ="";
        $rootScope.hasLogged = false;

        //Init Config Database
        DB.init();








        $rootScope.logoff = function(){
            //Remove Cookie
            $cookies.remove('user');
            $cookies.remove('userData');
            $rootScope.hasLogged = false;
            //Remove todos os dados relacionados a Pessoa do banco de dados
            Person.search("Person")
                .then(function(d){
                    console.log(d);
                    if(d.length > 0){
                        d.forEach(function(e){

                            var obj = e;
                            if(obj.id != undefined){
                                console.log(e);
                                Person.remove(obj.id)
                                    .then(function(d){
                                        console.log('Removed');
                                        console.log(d);
                                        $state.go('login');
                                        $scope.messages = [];
                                    });
                            }

                        });

                    }else {
                        $scope.messages = [];
                        $state.go('login');
                    }
                });
            io.emit('disconnectUser',$rootScope.user);
        }

        window.io.on('messageReceived',function(data){
            console.log($scope.conversas.length);
            console.log(data);

            for(var i =0; i < $scope.conversas.length; i++){
                if($scope.conversas[i].user_id == data.from.user_id){
                    $scope.conversas[i].count = $scope.conversas[i].count + 1;

                    if(!$scope.conversas[i].messages || $scope.conversas[i].messages == undefined){
                        $scope.conversas[i].messages = new Array();
                    }

                    var message = new Message({
                        owner: {
                            user_id: $rootScope.user.user_id,
                            name: $rootScope.user.name
                        },
                        conversationWith: {
                            user_id: data.from.user_id,
                            name: data.from.name
                        },
                        to: {
                            user_id:  data.to.user_id,
                            name: data.to.name
                        },
                        from: {
                            user_id: data.from.user_id,
                            name: data.from.name
                        },
                        data : data.data,
                        message: data.message
                    });


                    console.info("Message received");
                    console.info(message);

                    $scope.messages.push(message);

                    MessageDB.insert(message)
                    .then(function(d){
                        console.info(d);

                    })
                    .catch(function(err){
                        console.log(err);
                    });



                    $scope.$apply();
                    break;
                }
            }
        });




        $rootScope.toDataUrl = function(url, callback, outputFormat){
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var dataURL;
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                callback(dataURL);
                canvas = null;
            };
            img.src = url;
        }


        $scope.show = function() {
            $ionicLoading.show({
                template: 'Carregando...'
            });
        };
        $scope.hide = function(){
            $ionicLoading.hide();
        };

}]);
