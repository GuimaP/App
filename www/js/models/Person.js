function Person(user,email,password,role){
    this.user = user;
    this.email = email;
    this.password = password;
    this.role = role;

    this.setUser = function(nome) {
        this.nome = nome;
        return this;
    }

    this.setPassword = function(password){
        this.password = password;
        return this;
    }

    this.setEmail = function(email){
        this.email = email;
        return this;
    }

    this.getUser = function(){
        return this.user;
    }
    this.getEmail = function(){
        return this.email;
    }

    this.getPassword = function(){
      return this.password;
    }
}
