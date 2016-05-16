/**
 * Created by guilherme on 14/04/16.
 */
window.app.controller('ConfirmationCtrl',
    [
        '$scope','$state','PopupFactory','Person','Auth','$rootScope','$cookies','PersonDB','$ionicLoading',
        function($scope,$state,PopupFactory,Person,Auth,$rootScope,$cookies,PersonDB,$ionicLoading){



            $scope.user = $rootScope.user;

            $scope.user.user_initial_information = $scope.user.user_initial_information == undefined ? "Lorem Ipsum!" : $scope.user.user_initial_information;
            $scope.user.name = $scope.user.name;



            $scope.nextState = function(){
                $rootScope.user = $scope.user;
                $state.transitionTo('base.foto');
            }

            $scope.cancelar = function(){
                $state.transitionTo('login');
            }

        }]);
