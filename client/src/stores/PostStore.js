import { makeAutoObservable } from "mobx";
import { getDate } from "../helpers/getDate";
import Axios from "axios";
import { makePersistable } from "mobx-persist-store";

class Post {
	id = "";
	user_id = "";
	author = "";
	topic = "";
	title = "";
	subjectImage = "";
	body = "";
	dateOfPost = "";
	likes = 0;

	constructor(userId, author, topic, title, subjectImage, body) {
		makeAutoObservable(this);

		makePersistable(this, {
			name: "postStore",
			properties: [
				"user_id",
				"author",
				"topic",
				"title",
				"subjectImage",
				"body",
				"dateOfPost",
				"likes"
			],
			storage: window.localStorage
		});
		this.userId = userId;
		this.author = author;
		this.topic = topic;
		this.title = title;
		this.subjectImage = subjectImage;
		this.body = body;
		this.dateOfPost = getDate();
	}

	async save() {
		const { userId, author, topic, title, subjectImage, body, dateOfPost } = this;
		return Axios.post("/posts", {
			userId,
			author,
			topic,
			title,
			subjectImage,
			body,
			dateOfPost
		});
	}

	async update(id) {
		console.log(id);
		const { userId, author, topic, title, subjectImage, body, dateOfPost } = this;
		return Axios.put(`/posts/${id}`, {
			userId,
			author,
			topic,
			title,
			subjectImage,
			body,
			dateOfPost
		});
	}

	static async delete(id) {
		return Axios.delete(`/posts/${id}`);
	}

	static async getAllPosts(pageNumber) {
		return Axios.get(`/posts/?page=${pageNumber}`);
	}

	static async getLatestPosts() {
		return Axios.get("/posts/latest");
	}
	static async getMostLikedPosts() {
		return Axios.get("/posts/most-liked");
	}
	static async getPostById(id) {
		return Axios.get(`/posts/${id}`);
	}

	static async getComments(id) {
		return Axios.get(`/post/${id}/comments`);
	}
}

export default Post;
