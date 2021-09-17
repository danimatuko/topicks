import { action, makeObservable, observable } from "mobx";
import { getDate } from "../helpers/getDate";
import Axios from "axios";

class Post {
	user_id = "";
	author = "John Doe";
	topic = "Technology";
	title = "";
	subjectImage = "";
	body = "";
	dateOfPost = "";

	constructor(userId, author, topic, title, subjectImage, body) {
		makeObservable(this, {
			title: observable,
			body: observable,
			save: action
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
		try {
			await Axios.post("/posts", {
				userId,
				author,
				topic,
				title,
				subjectImage,
				body,
				dateOfPost
			});
		} catch (error) {
			console.log(error);
		}
	}
	static getAllPosts() {
		try {
			return Axios.get("/posts");
		} catch (error) {
			console.log(error);
		}
	}

	static async get(id) {
		try {
			return await Axios.get(`/posts/${id}`);
		} catch (error) {
			console.log(error);
		}
	}
}

export default Post;
