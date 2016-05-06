window.app.controller('GlobalCtrl',
    ['$http','DB','$scope','$rootScope','$cookies','Person','$state','PersonDB',
    function($http,DB,$scope,$rootScope,$cookies,Person,$state,PersonDB){
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
