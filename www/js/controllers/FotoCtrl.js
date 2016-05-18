window.app.controller('FotoCtrl',
    ['$scope','$rootScope','$cordovaCamera','Person','$cookies','$state','PersonAPI','PersonDB',
    function($scope,$rootScope,$cordovaCamera,Person,$cookies,$state,PersonAPI,PersonDB){
        $scope.userCadastro = {
            name: "",
            lastname: "",
            email: ""
        }


        $scope.$on("$ionicView.beforeEnter", function(event, data){
            $scope.user = $rootScope.user == undefined ? {} : $rootScope.user;
            $scope.user.photo = $scope.user.photo == undefined ? 'img/ionic.png' : $scope.user.photo;
            $scope.user.photoPath = $scope.user.photo;
            $scope.user.name = $scope.user.name == "" ? $scope.user.user_initial_information : $scope.user.name;


            console.log($rootScope.user);
            console.log($scope.user);
            console.log($scope.hasLogged);


            if($rootScope.hasLogged){

                console.log($rootScope.user.name);
                console.log($rootScope.user.email);
                console.log($rootScope.user.lastname);

                $scope.imgURI = $rootScope.photoPath;
                $scope.userCadastro.name = $rootScope.user.name;
                $scope.userCadastro.email = $rootScope.user.email;
                $scope.userCadastro.lastname = $rootScope.user.lastname;
            }
        });


        console.log($scope.user);



        $scope.picture = function(){
            //document.addEventListener("deviceready", function () {
                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI,
                    //destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG,
                    allowEdit: true,
                    targetWidth: 100,
                    targetHeight: 100,
                    cameraDirection : 0,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true,
                    correctOrientation:false
                };

                $cordovaCamera.getPicture(options).then(function(imageData) {


                    //Pego a imagem tirada e atualizo no objeto

                    $scope.imgURI = imageData;
                    console.log(imageData);
                    //$scope.imgURI = "data:image/jpeg;base64,"+ imageData;

                    $scope.user.photoPath = $scope.imgURI;

                    $rootScope.toDataUrl($scope.imgURI,function(url){
                        $scope.user.photo = url;
                    });



                    $rootScope.user = $scope.user;


                }, function(err) {
                    console.log(err);
                }).catch(function(err){
                    console.log(err);
                });
            //}, false);
        }

        $scope.cancel = function(){
            if($rootScope.hasLogged){
                $state.go('app.home');
            }else {

                $rootScope.logoff();
            }
        }

        $scope.nextState = function(){
            $scope.show();
            try {
                console.log(this.userCadastro);
                $rootScope.user.name = this.userCadastro.name;
                $rootScope.user.lastname = this.userCadastro.lastname;
                $rootScope.user.email = this.userCadastro.email;

                console.log($rootScope.user);

                //Se o cara n estiver logado ele faz o registro da api e tudo mais....
                if(!$rootScope.hasLogged){

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
                                $rootScope.hasLogged = true;

                                //se não, manda pra foto

                            }).catch(function (err) {
                            $scope.hide();
                            console.log(err);
                        });




                }else {

                    var person = Person.createFrom($rootScope.user);
                    console.log(person);
                    console.log($rootScope.user);
                    //Adiciono no BANCO
                    PersonDB.update(person);

                    //Envio para a API
                    PersonAPI.update($rootScope.user)
                        .then(function (d) {
                            $scope.hide();

                            $rootScope.hasLogged = true;

                            //$state.transitionTo("app.home"); //Manda pra home

                            //Vinculo com o usuario do APPCTRL
                            $scope.myUser = $rootScope.user;
                            $scope.user = $rootScope.user;
                            $scope.$apply();



                        }).catch(function (err) {
                        $scope.hide();
                        console.log(err);
                    });
                }

            }catch(e){
                $scope.hide();
                console.error((e));
            }



            $rootScope.toDataUrl($rootScope.user.photo, function(url){
                //$rootScope.user.setPhoto(url);
            });

        }


    }]);