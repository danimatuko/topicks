import { makeAutoObservable } from "mobx";
import Axios from "axios";
import { makePersistable } from "mobx-persist-store";

class Comment {
	postId = "";
	id = "";
	userId = "";
	author = "";
	commentBody = "";
	dateOfComment = "";

	constructor() {
		makeAutoObservable(this);
		makePersistable(this, {
			name: "commentStore",
			properties: ["postId", "id", "author", "commentBody", "dateOfComment"],
			storage: window.localStorage
		});

	}

	static async getAll(id) {
		return Axios.get(`/post/${id}/comments`);
	}

	async save() {
		const { postId, userId, author, commentBody, dateOfComment } = this;

		return Axios.post(`/post/${postId}/comments`, {
			postId,
			userId,
			author,
			commentBody,
			dateOfComment
		});
	}
}

export default Comment;
