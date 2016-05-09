window.app.controller('GlobalCtrl',
    ['$http','DB','$scope','$rootScope','$cookies','Person','$state','PersonDB','MessageDB',
    function($http,DB,$scope,$rootScope,$cookies,Person,$state,PersonDB,MessageDB){
    //Registrar os eventos aqui....
    window.io = io.connect("http://192.168.0.149:3000");
        $rootScope.messages = [];


        io.on('pergunta',function(data){
            alert(data);
        });


        //Init Config Database
        DB.init();

        $rootScope.logoff = function(){
            //Remove Cookie
            $cookies.remove('user');
            $cookies.remove('userData');

            //Remove All Data from BD
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
                                    });
                            }

                        });

                    }else {
                        $state.go('login');
                    }
                });


            io.emit('disconnectUser');
        }

        window.io.on('messageReceived',function(data){
            console.log($rootScope.conversas.length);
            console.log(data);

            for(var i =0; i < $rootScope.conversas.length; i++){
                if($rootScope.conversas[i].user_id == data.from.user_id){
                    $rootScope.conversas[i].count = $rootScope.conversas[i].count + 1;

                    if(!$rootScope.conversas[i].messages || $rootScope.conversas[i].messages == undefined){
                        $rootScope.conversas[i].messages = new Array();
                    }
                    /*var msg = new Message({
                        owner: $rootScope.user,
                        to: data.to,
                        from: data.from,
                        data : data.data,
                        message: data.message
                    });*/

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

                    MessageDB.insert(message)
                    .then(function(d){
                        console.info(d);

                    })
                    .catch(function(err){
                        console.log(err);
                    });

                    //$rootScope.conversas[i].messages.push(data.message);
                    //console.log($rootScope.conversas);

                    $rootScope.$apply();
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


}]);
