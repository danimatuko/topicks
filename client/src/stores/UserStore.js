import { makeAutoObservable } from "mobx";
import Axios from "axios";

import { clearPersistedStore, getPersistedStore, makePersistable } from "mobx-persist-store";

class User {
	id = "";
	first_name = "";
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

	static async signUp(first_name, last_name, email, password, role) {
		return await Axios.post("/users", {
			first_name,
			last_name,
			email,
			password
		});
	}

	static async login(email, password) {
		return await Axios.post("/users/login", {
			email: email,
			password: password
		});
	}

	// logout by clearin localstorage with mobx-persist-store
	async logout() {
		await clearPersistedStore(this);
		this.getStoredData();
		window.location.href = "/login";
	}

	async getStoredData() {
		return getPersistedStore(this);
	}
}

export default User;
