import { action, makeObservable, observable } from "mobx";
import { getDate } from "../helpers/getDate";
import Axios from "axios";

class Post {
	author = "John Doe";
	topic = "Technology";
	title = "";
	subjectImage = "";
	body = "";
	dateOfPost = "";

	constructor(author, topic, title, subjectImage, body) {
		makeObservable(this, {
			title: observable,
			body: observable,
			save: action
		});

		this.author = author;
		this.topic = topic;
		this.title = title;
		this.subjectImage = subjectImage;
		this.body = body;
		this.dateOfPost = getDate();
	}

	async save() {
		const { author, topic, title, subjectImage, body, dateOfPost } = this;
		try {
			await Axios.post("/posts", {
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
