import { action, makeObservable, observable } from "mobx";
import { getDate } from "../helpers/getDate";

class Post {
	id = Math.random();
	author = "John Doe";
	topic = "Technology";
	title = "";
	body = "";
	date = "";

	constructor(title, body) {
		makeObservable(this, {
			title: observable,
			body: observable,
			save: action
		});

		this.author = this.author;
		this.title = title;
		this.topic = this.topic;
		this.body = body;
		this.date = getDate();
	}

	save() {
		localStorage.setItem(`post-${this.id}`, this.body);
	}

	static get(id) {
		return localStorage.getItem(id);
	}
}

export default Post;
