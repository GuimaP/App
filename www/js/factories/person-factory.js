/**
 * Created by guilherme on 14/04/16.
 */
window.app.factory('Person',function(){
   function Person(nome,email,senha,role){
       this.nome = nome;
       this.email = email;
       this.senha = senha;
       this.role = role;

       this.setNome = function(nome) {
           this.nome = nome;
           return this;
       }

       this.setEmail = function(email){
           this.email = email;
           return this;
       }

       this.getNome = function(){
           return this.nome;
       }
       this.getEmail = function(){
           return this.nome;
       }
   }

    return {
        createNew: function(){
            return new Person(null,null,null,0);
        },
        createFrom: function(nome,email,senha){
            return new Person(nome,email,senha)
        }
    }
});
