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

    }
  }
}])
