import { makeAutoObservable } from "mobx";
import Axios from "axios";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";

class Comment {
	postId = "";
	id = "";
	userId = "";
	author = "";
	commentBody = "";
	dateOfComment = "";
	profileImage = "";

	constructor() {
		makeAutoObservable(this);
		makePersistable(this, {
			name: "commentStore",
			properties: ["postId", "id", "author", "commentBody", "dateOfComment", "profileImage"],
			storage: window.localStorage
		});
	}

	static async getAll(id) {
		return Axios.get(`/post/${id}/comments`);
	}

	async save(token) {
		const { postId, userId, author, commentBody, dateOfComment, profileImage } = this;

		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};

		return Axios.post(
			`/post/${postId}/comments`,
			{
				postId,
				userId,
				author,
				commentBody,
				dateOfComment,
				profileImage
			},
			config
		);
	}

	static async edit(comment, token) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};
		return Axios.put(`/post/${comment.postId}/comments/${comment.id}`, comment, config);
	}

	static async delete(id, postId, token) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};
		return Axios.delete(`/post/${postId}/comments/${id}`, config);
	}

	async clear() {
		await clearPersistedStore(this);
	}
}

export default Comment;
