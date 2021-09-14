import { makeAutoObservable} from "mobx";
import Axios from "axios";

import { makePersistable } from "mobx-persist-store";

class User {
	id = "";
	first_name = "Dani";
	last_name = "";
	email = "";
	role = "";

	constructor() {
		makeAutoObservable(this);
	
		makePersistable(this, {
			name: "userStore",
			properties: ["id", "first_name", "last_name", "email", "role"],
			storage: window.localStorage
		});
	}

	static async login(email, passsword) {
		return await Axios.post("/users/login", {
			email: email,
			password: passsword
		});
	}
}

export default User;
