/**
 * Created by guilherme on 09/05/16.
 */
function Message(obj){
    this._id  = 0;
    this.conversationWith =  obj.conversationWith; //Marca com quem é a conversa
    this.owner = obj.owner;
    this.from = obj.from;
    this.to = obj.to;
    this.message = obj.message;
    this.data = obj.data;

    this.toJSON = function(){
        return JSON.parse(JSON.stringify(this));
    }


}