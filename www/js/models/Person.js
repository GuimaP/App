function Person(user){
    this.access_token = user.access_token;
    this._id  = user._id;
    this._rev  = user._rev;
    this.user_id = user.user_id;
    this.login = user.login;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.role = user.role;
    this.photo = user.photo;
    this.photoPath = user.photoPath;
    this.lastname = user.lastname;
    this.user_initial_information = user.user_initial_information;
    this.type = user.type;


    this.setToken = function(token){
        this.access_token = token;
        return this;
    }
    this.setId = function(id){
        this._id = id;
        return this;
    }

    this.setUserId = function(id){
        this.user_id = id;
        return this;
    }
    this.setPhoto = function(photo){
        this.photo = photo;
        return this;
    }
    this.setLogin = function(nome) {
        this.login = nome;
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

    this.setName = function(name) {
        this.name = name;
        return this;
    }

    this.setRole = function(role){
        this.role = role;
        return this;
    }




    this.getToken = function(){
        return this.access_token;
    }
    this.getId = function(){
        return this.id;
    }
    this.getUserId = function(){
        return this.user_id;
    }
    this.getLogin = function(){
        return this.login;
    }
    this.getEmail = function(){
        return this.email;
    }

    this.getPassword = function(){
      return this.password;
    }
    this.getName = function(){
        return this.password;
    }

    this.getRole = function(){
        return this.role;
    }
    this.getPhoto = function(){
        return this.photo;
    }
    /**
     * @desc convert The object into a Pure JSON
     */
    this.toJSON = function(){

        return {

            access_token: this.access_token,
            _id: this._id,
            _rev: this._rev,
            user_id: this.user_id,
            login: this.login,
            email: this.email,
            name: this.name,
            password: this.password,
            role: this.role,
            photo: this.photo,
            photoPath: this.photoPath,
            lastname: this.lastname,
            user_initial_information: this.user_initial_information




        }
    }




}
