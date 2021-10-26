import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import Post from "../stores/PostStore";
import { StoreContext } from "../stores/RootStore";
import { editorConfig } from "../tinymce.config";

const CreatePost = ({ history, match }) => {
	const { user } = useContext(StoreContext);
	const [error, setError] = useState(null);
	const [edit, setEdit] = useState(false);

	const initialState = {
		userId: "",
		author: user.first_name + " " + user.last_name,
		title: "",
		topic: "",
		subjectImage: "",
		postHTML: "",
		profileImage: user.profileImage
	};

	const [post, setPost] = useState(initialState);

	useEffect(() => {
		match.params.id ? setEdit(true) : setEdit(false);
		edit ? populateFormData() : setPost(initialState);
		// eslint-disable-next-line
	}, [match.params.id, edit]);

	const handleChange = ({ name, value }) => {
		setPost({ ...post, [name]: value });
	};

	const handleEditorChange = (e) => {
		setPost({ ...post, postHTML: e.target.getContent() });
	};

	const populateFormData = async () => {
		try {
			const { data } = await Post.getPostById(match.params.id);

			const postToEdit = {
				userId: data._id,
				author: user.first_name + " " + user.last_name,
				title: data.title,
				topic: data.topic,
				subjectImage: data.subjectImage,
				postHTML: data.body
			};

			setPost({ ...post, ...postToEdit });
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user.id);

		const newPost = new Post(
			user.id,
			post.author,
			post.topic,
			post.title,
			post.subjectImage,
			post.postHTML,
			post.profileImage
		);

		const token = user.token;

		try {
			!edit ? await newPost.save(token) : await newPost.update(match.params.id, token);
			history.push("/dashboard");
		} catch (error) {
			console.log({ error });
			setError(error.response.data.message || error.message);
			window.scrollTo(0, 0);
		}
	};

	return (
		<Container className="pt-3 mb-5">
			{error && <Alert variant="danger">{error}</Alert>}
			<h1 className="my-5 display-3">Write Somthing...</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>
						<span className="text-danger me-1">*</span> Title
					</Form.Label>
					<Form.Control
						name="title"
						value={post.title}
						type="text"
						onChange={(e) => handleChange(e.target)}
					/>
					<Form.Text className="text-muted">
						This will appear at the preview of the post
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="topic">
					<Form.Label>
						<span className="text-danger me-1">*</span>Topic
					</Form.Label>
					<Form.Select
						name="topic"
						value={post.topic}
						onChange={(e) => handleChange(e.target)}
					>
						<option>Money</option>
						<option>Technology</option>
						<option>Business</option>
						<option>Mindfulness</option>
						<option>Art</option>
						<option>Music</option>
						<option>Sports</option>
						<option>Politics</option>
						<option>Society</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3" controlId="subjectImage">
					<Form.Label>Subject Image</Form.Label>
					<Form.Control
						name="subjectImage"
						value={post.subjectImage}
						type="text"
						placeholder="Enter image source from URL"
						onChange={(e) => handleChange(e.target)}
					/>
					<Form.Text className="text-muted">
						This will appear at the preview of the post
					</Form.Text>
				</Form.Group>
				<Form.Label>
					<span className="text-danger me-1">*</span>Body
				</Form.Label>
				<Editor
					apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
					initialValue={post.postHTML}
					init={editorConfig}
					onChange={(e) => handleEditorChange(e)}
				/>
				<Button variant="dark" type="submit" className="w-100 mt-3">
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default CreatePost;
