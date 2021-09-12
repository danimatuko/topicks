import { action, makeObservable, observable } from "mobx";
import Axios from "axios";

class User {
	id = "";
	first_name = "";
	last_name = "";
	email = "";
	role = "";

	constructor(id, first_name, last_name, email, role) {
		makeObservable(this, {
			id: observable,
			first_name: observable,
			last_name: observable,
			email: observable,
			role: observable,
			login: action
		});

		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.role = role;
	}

	static async login(email, passsword) {
		try {
			const user = await Axios.post("/users/login", {
				email: email,
				password: passsword
			});
			return user;
		} catch (error) {
			console.log(error);
		}
	}
}

export default User;
