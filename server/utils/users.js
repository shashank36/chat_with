// array of user object
//each user object has socket id,name,room

//methods
//addUser
//remove user(id)
//getUser(id)
//getUserList


class Users {
	
	constructor(){
		this.users = [];
	}

	addUser (id,name,room){
		var user = {id,name,room};
		this.users.push(user);
		return user;
	}

	getUser(id){
		return this.users.filter((user) =>  user.id === id)[0];

	}

	removeUser(id){
		var user = this.getUser(id);
		if (user){
			this.users = this.users.filter((user) => user.id !== id);
		}

		return user;

	}


	getUserList(room){
		var users = this.users.filter((user) => user.room === room);
		var usersArray = users.map((user) => user.name);

		return usersArray;
	}


}


module.exports = {Users};