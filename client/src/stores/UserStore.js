import { makeAutoObservable } from "mobx";
import Axios from "axios";

import { clearPersistedStore, getPersistedStore, makePersistable } from "mobx-persist-store";

class User {
	id = "";
	first_name = "";
	last_name = "";
	email = "";
	role = "";
	activity = {
		favorites: [],
		likedPosts: [],
		savedForLater: []
	};
	profileImage = "";
	token = null;
	isAuth = false;

	constructor() {
		makeAutoObservable(this);

		makePersistable(this, {
			name: "userStore",
			properties: [
				"id",
				"first_name",
				"last_name",
				"email",
				"role",
				"activity",
				"profileImage",
				"token",
				"isAuth"
			],
			storage: window.localStorage
		});
	}

	static async signUp(first_name, last_name, email, password, role) {
		return Axios.post("/users", {
			first_name,
			last_name,
			email,
			password
		});
	}

	static async login(email, password) {
		return Axios.post("/users/login", {
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

	async like(postId) {
		const config = {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		};

		const userId = this.id;
		return Axios.post(`/posts/like`, { postId, userId }, config);
	}

	async bookMark(postId) {
		const config = {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		};
		const userId = this.id;
		return Axios.post(`/posts/read-later`, { postId, userId }, config);
	}

	async getPosts() {
		return Axios.get(`/posts/user/${this.id}`);
	}

	async getReadingList() {
		const config = {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		};
		return Axios.get(`/posts/user/reading-list/${this.id}`, config);
	}

	async authenticate() {
		const config = {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		};
		return Axios.get(`/users/${this.id}`, config);
	}

	async updateProfileImage(profileImage) {
		const config = {
			headers: {
				Authorization: `Bearer ${this.token}`
			}
		};
		return Axios.put(`/users/${this.id}/profile-image`, { profileImage: profileImage }, config);
	}
}

export default User;
