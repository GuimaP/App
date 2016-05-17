window.app.controller('FotoCtrl',
    ['$scope','$rootScope','$cordovaCamera','Person','$cookies','$state','PersonAPI',
    function($scope,$rootScope,$cordovaCamera,Person,$cookies,$state,PersonAPI){
        $scope.user = $rootScope.user == undefined ? {} : $rootScope.user;

        $scope.user.photo = $scope.user.photo == undefined ? '../img/ionic.png' : $scope.user.photo;
        $scope.user.name = $scope.user.name == undefined ? 'User' : $scope.user.name;

        $scope.$on("$ionicView.beforeEnter", function(event, data){
            $rootScope.classMenuTopo = "collapse-menu";

        });


        $scope.picture = function(){
            //document.addEventListener("deviceready", function () {
                var options = {
                    quality: 100,
                    //destinationType: Camera.DestinationType.FILE_URI,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    allowEdit: true,
                    targetWidth: 100,
                    targetHeight: 100,
                    cameraDirection : 1,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true,
                    correctOrientation:false
                };

                $cordovaCamera.getPicture(options).then(function(imageData) {


                    //Pego a imagem tirada e atualizo no objeto

                    //$scope.imgURI = imageData;
                    console.log(imageData);
                    $scope.imgURI = "data:image/jpeg;base64,"+ imageData;

                    $scope.user.setPhoto($scope.imgURI);

                    $rootScope.user = $scope.user;


                }, function(err) {
                    console.log(err);
                }).catch(function(err){
                    console.log(err);
                });
            //}, false);
        }

        $scope.nextState = function(){
            $scope.show();


            try {

                console.log(this.userCadastro);
                $rootScope.user.name = this.userCadastro.name;
                $rootScope.user.lastname = this.userCadastro.lastname;
                $rootScope.user.email = this.userCadastro.email;

                console.log($rootScope.user);




                $cookies.putObject("user",true);
                 $cookies.putObject("userData",$rootScope.user.toJSON());

                console.log($rootScope.user);

                //Adiciono no BANCO
                Person.insert($rootScope.user);

                //Envio para a API
                PersonAPI.insert($rootScope.user)
                    .then(function (d) {
                        $scope.hide();

                        //Verifica se o user ja foi cadastrado
                        $state.transitionTo("app.home"); //Manda pra home

                        //se não, manda pra foto

                    }).catch(function (err) {
                    $scope.hide();
                    console.log(err);
                });



            }catch(e){
                $scope.hide();
                console.error((e));
            }

            /*$rootScope.toDataUrl($rootScope.user.photo, function(url){
                //$rootScope.user.setPhoto(url);
            });*/

        }


    }]);