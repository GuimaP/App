/**
 * Created by guilherme on 04/05/16.
 */
function Role(role){
    this._id  = 0;
    this.id = role.id;
    this.name = role.name;

    this.setId = function(id){
        this.id = id;
        return this;
    }

    this.setName = function(name){
        this.name = name;
        return this;
    }

    this.getId = function(){
        return this.id;
    }

    this.getName = function(){
        return this.name;
    }


}