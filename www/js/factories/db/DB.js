/**
 * Created by guilherme on 04/05/16.
 */
window.app.factory('DB',function($rootScope){

    return {
        init : function(){

            $rootScope.pdb = new PouchDB('revmais');
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