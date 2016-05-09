window.app.controller('FotoCtrl',
    ['$scope','$rootScope','$cordovaCamera','Person','$cookies','$state',
    function($scope,$rootScope,$cordovaCamera,Person,$cookies,$state){
        $scope.user = $rootScope.user == undefined ? {} : $rootScope.user;

        $scope.user.photo = $scope.user.photo == undefined ? '/img/ionic.png' : $scope.user.photo;


        $scope.picture = function(){
            //document.addEventListener("deviceready", function () {
                var options = {
                    quality: 100,
                    //destinationType: Camera.DestinationType.FILE_URI,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    allowEdit: false,
                    targetWidth: 100,
                    targetHeight: 100,
                    cameraDirection : 1,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true,
                    correctOrientation:false
                };

                $cordovaCamera.getPicture(options).then(function(imageData) {


                    console.log(imageData);
                    // $scope.imgURI = "data:image/jpeg;base64,"+ imageData;
                    //Pego a imagem tirada e atualizo no objeto
                    $scope.imgURI = imageData;
                    $scope.user.setPhoto(imageData);

                    $rootScope.user = $scope.user;





                }, function(err) {
                    // error
                    console.log(err);
                }).catch(function(err){
                    console.log(err);
                });
            //}, false);
        }

        $scope.nextState = function(){

            //Adiciona na API
            //Person.add($rootScope.user);

            console.log($rootScope.user);
            console.log($rootScope.user.toJSON());
            $cookies.putObject("user",true);
            $cookies.putObject("userData",$rootScope.user.toJSON());



            //Adiciono no BANCO
            Person.insert($rootScope.user);

            //Registro um cookie para identificar que ele está logdo


            $state.transitionTo("app.home");


            /*$rootScope.toDataUrl($rootScope.user.photo, function(url){
                //$rootScope.user.setPhoto(url);
            });*/

        }


    }]);