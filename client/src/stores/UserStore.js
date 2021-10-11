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

	constructor() {
		makeAutoObservable(this);

		makePersistable(this, {
			name: "userStore",
			properties: ["id", "first_name", "last_name", "email", "role", "activity"],
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
		const userId = this.id;
		return Axios.post(`/posts/like`, { postId, userId });
	}

	async bookMark(postId) {
		const userId = this.id;
		return Axios.post(`/posts/read-later`, { postId, userId });
	}

	async getPosts() {
		return Axios.get(`/posts/user/${this.id}`);
	}

	async getReadingList() {
		return Axios.get(`/posts/user/reading-list/${this.id}`);
	}

	async getLoggedInUser() {
		return Axios.get(`/users/${this.id}`);
	}

	async updateProfileImage(profileImage) {
		return Axios.put(`/users/${this.id}/profile-image`, profileImage);
	}
}

export default User;
