// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
window.app = angular.module('starter', ['ionic','ngCookies','ngCordova'])
.constant("host", {
    "websocket": "http://192.168.0.149:3000",
    "url": "http://192.168.0.136:8000"
    //"url": "http://localhost:8100"
    //"url": "http://localhost:8080"
})
.run(function($ionicPlatform,$http) {
    //$http.defaults.headers.common.ContentType = "application/json";



    console.log("ae");
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider,$httpProvider){

  $stateProvider
      .state('app',{
        url: "/app",
        templateUrl: 'templates/app.html',
        controller: 'AppCtrl',
        abstract: true
      })
      .state("app.home",{
        url : "/home",
        views : {
          "mainContent" : {
            templateUrl: "templates/home.html",
            controller: "HomeCtrl"
          }
        }
      })
      .state("app.perfil",{
          url : "/perfil",
          views : {
              "mainContent" : {
                  templateUrl: "templates/perfil.html",
                  controller: "PerfilCtrl"
              }
          }
      })
      .state("app.apresentacao",{
          url : "/apresentacao",
          views : {
              "mainContent" : {
                  templateUrl: "templates/apresentacao.html",
                  controller: "ApresentacaoCtrl"
              }
          }
      })
      .state("foto",{
          url : "/foto",
          templateUrl: "templates/foto.html",
          controller: "FotoCtrl"
      })
      .state("app.quiz",{
          url : "/quiz",
          views : {
              "mainContent" : {
                  templateUrl: "templates/quiz.html",
                  controller: "QuizCtrl"
              }
          }
      })
      .state("app.chat",{
          url : "/chat",
          views : {
              "mainContent" : {
                  templateUrl: "templates/chat.html",
                  controller: "ChatCtrl"
              }
          }
      })
      .state("app.converstation",{
          url : "/conversation/:index",
          views : {
              "mainContent" : {
                  templateUrl: "templates/conversation.html",
                  controller: "ConversationCtrl"
              }
          }
      })
      .state("app.pergunta",{
          url : "/perguntas",
          views : {
              "mainContent" : {
                  templateUrl: "templates/pergunta.html",
                  controller: "PerguntaCtrl"
              }
          }
      })
      .state("app.nuvem",{
          url: '/nuvem',
          views : {
              "mainContent" : {
                  templateUrl: 'templates/nuvem.html',
                  controller: 'NuvemCtrl'
              }
          }

      })
      .state("login",{
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
      });

    console.log("OPS");

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    /*$httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};*/

    var utils = {};
// Could create a utility function to do this
    utils.inArray = function(searchFor, property) {
        var retVal = -1;
        var self = this;
        for(var index=0; index < self.length; index++){
            var item = self[index];
            if (item.hasOwnProperty(property)) {
                if (item[property].toLowerCase() === searchFor.toLowerCase()) {
                    retVal = index;
                    return retVal;
                }
            }
        };
        return retVal;
    };

    // or we could create a function on the Array prototype indirectly
    Array.prototype.inArray = utils.inArray;



  $urlRouterProvider.otherwise('/login');
})
.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
})
.directive('onFinishRenderSlider', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinishedSlider');
                });
            }
        }
    }
});

