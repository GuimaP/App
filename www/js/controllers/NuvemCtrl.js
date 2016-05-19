window.app.controller('NuvemCtrl',['$scope','$rootScope','$ionicScrollDelegate','$timeout','WordCloudDB','NuvemAPI',
    function($scope,$rootScope,$ionicScrollDelegate,$timeout,WordCloudDB,NuvemAPI){
    $scope.palavras = [];

        window.io.on('updateWord',function(){
            console.log("AE");

            WordCloudDB.myAll()
                .then(function(d){
                    console.log(d);
                    $scope.palavras = d;
                    console.log($scope.palavras);
                    $scope.$apply();
                });
        });


    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');


        $scope.$on("$ionicView.beforeEnter",function(data,event){

            WordCloudDB.myAll()
                .then(function(d){
                    $scope.palavras = d;
                    console.log($scope.palavras);
                    //Update the scroll
                    $timeout(function() {
                        viewScroll.scrollBottom();
                    }, 0);
                });
            //$scope.palavras =
        });

    $scope.sendWord = function(){




        //Build the word
        var data = new WordCloud({
            tag_name: this.tag_name,
            tag_status: "false",
            client: $rootScope.user.user_id
        });

        $scope.palavras.push(data);

        //Update the scroll
        $timeout(function() {
            viewScroll.scrollBottom();
        }, 0);



        //
        NuvemAPI.send(data)
        .then(function(d){
            console.log(d);
            data.tag_id = d.data.tag.tag_id;
            console.log(data);
            WordCloudDB.insert(data);
            window.io.emit('newWord',data)

        });

        //Insert into database

        this.tag_name = "";



        //Send Event to update real time

        //window.emit('newWord');



    }

}]);
