window.app.factory('PopupFactory',['$ionicPopup',function($ionicPopup){
  return {
    error: function(title,subtitle){
      // An alert dialog

      var myPopup = $ionicPopup.show({
        // template: subtitle, no caso de colocar alguma componente
        title: title,
        subTitle: subtitle,
        // scope: $scope,
        buttons: [
          {
            text: '<b>OK</b>',
            type: 'button-assertive',
            // onTap: function(e) {
            //   if (!$scope.data.wifi) {
            //     //don't allow the user to close unless he enters wifi password
            //     e.preventDefault();
            //   } else {
            //     return $scope.data.wifi;
            //   }
            // }
          }
        ]
      });

    },
    perguntaReceived: function(scope){

      var myPopup = $ionicPopup.show({
        templateUrl: 'templates/popup/pergunta-received.html',
        cssClass: 'popup-pergunta',
        title: 'Pergunta de ' + scope.ask.from.name,
        subTitle: 'as ' + scope.ask.date,
        scope: scope,
        buttons: [
          {
            text: '<b>Aprovar</b>',
            type: 'button-positive',
            onTap: function(e) {
              //Emite um evento para o apresentador....


              if(!scope.ask.question){

                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {

                return scope.ask;
              }
            }
          },
          { text: 'Cancelar' },
        ]
      });

      myPopup.then(function(res) {

        if(res != undefined) {
          console.log(res);
          window.io.emit('questionForPresenter',res);

        }else {
          console.log('cancelado');
        }

      });
    }
  }
}])
