import { makeAutoObservable } from "mobx";
import { getDate } from "../helpers/getDate";
import Axios from "axios";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";

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
	profileImage = "";

	constructor(userId, author, topic, title, subjectImage, body, profileImage) {
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
				"likes",
				"profileImage"
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
		this.profileImage = profileImage;
	}

	async save() {
		const { userId, author, topic, title, subjectImage, body, dateOfPost, profileImage } = this;
		return Axios.post("/posts", {
			userId,
			author,
			topic,
			title,
			subjectImage,
			body,
			dateOfPost,
			profileImage
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
	static async getPostsByTopic(topic) {
		return Axios.get(`/posts/topic=${topic}`);
	}

	static async getPostById(id) {
		return Axios.get(`/posts/${id}`);
	}

	static async getComments(id) {
		return Axios.get(`/post/${id}/comments`);
	}

	async clear() {
		await clearPersistedStore(this);
	}
}

export default Post;
