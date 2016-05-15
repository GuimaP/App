/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('ConfirmationCtrl',
    [
        '$scope','$state','PopupFactory','Person','Auth','$rootScope','$cookies','PersonDB','$ionicLoading',
        function($scope,$state,PopupFactory,Person,Auth,$rootScope,$cookies,PersonDB,$ionicLoading){



            $scope.user = $rootScope.user;

            $scope.user= {
                user_initial_information : "Lorem Ipsum"
            };

            $scope.nextState = function(){
                $state.transitionTo('app.foto');
            }

            $scope.cancel = function(){
                $state.transitionTo('login');
            }

        }]);
