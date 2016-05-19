/**
 * Created by guilherme on 04/05/16.
 */
window.app.factory('DB',function($rootScope){

    return {
        init : function(){

            /*$rootScope.db = openDatabase(
                'revDB',
                '1.0',
                'Database',
                10 * 1024 * 1024
            );


            //Creating my Databases.
            $rootScope.db.transaction(function(tx){
               tx.executeSql('CREATE TABLE IF NOT EXISTS Person (' +
                   'access_token TEXT,' +
                   'user_id INTEGER NOT NULL,' +
                   '_id INTEGER PRIMARY KEY,' +
                   'login VARCHAR(255),' +
                   'email VARCHAR(255),' +
                   'name VARCHAR(255),' +
                   'password VARCHAR(255),' +
                   'role INTEGER,' +
                   'photo TEXT,'+
                   'json TEXT'+
                   ')');

                tx.executeSql('CREATE TABLE IF NOT EXISTS Message (' +
                    'owner TEXT,' + //JSON
                    'conversationWith INTEGER NOT NULL,' +
                    '_id INTEGER PRIMARY KEY,' +
                    'from TEXT,' + //JSON
                    'to TEXT,' + //JSON
                    'message TEXT,' + //JSON
                    'data DATETIME' +
                    ')');
            });*/

            $rootScope.pdb = new PouchDB('revmaisv3',{adapter:"websql"});
            //$rootScope.pdb = new PouchDB('revmais');
            /*$rootScope.pdb.destroy()
            .then(function(d){
                console.log(d)
            })
            .catch(function(er){
                console.log(er);
            });*/

        }
    }
});