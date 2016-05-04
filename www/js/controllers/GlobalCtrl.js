window.app.controller('GlobalCtrl',['$http','DB',function($http,DB){
    //Registrar os eventos aqui....
    window.io = io.connect("http://192.168.0.149:3000");
    

    io.on('pergunta',function(data){
        alert(data);
    });


    //Init Config Database
    DB.init();




}]);
