window.app.controller('GlobalCtrl',['$http',function($http){
    //Registrar os eventos aqui....
    window.io = io.connect("http://192.168.0.149:3000");
    

    io.on('pergunta',function(data){
        alert(data);
    });

    $http.get("http://app.easyanime.com.br/api/animes?page=1")
        .success(function(d){
            console.log(d)
        });





}]);
