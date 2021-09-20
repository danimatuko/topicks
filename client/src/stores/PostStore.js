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
				"id",
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

	static async getAllPosts() {
		return Axios.get("/posts");
	}

	static async getLatestPosts() {
		return Axios.get("/posts/latest");
	}
	static async getMostLikedPosts() {
		return Axios.get("/posts/most-liked");
	}
	static async getPostById(id) {
		return await Axios.get(`/posts/${id}`);
	}
}

export default Post;
