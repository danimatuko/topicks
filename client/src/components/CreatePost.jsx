import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";
import Post from "../Models/Post";

const CreatePost = () => {
	const initialState = {
		author: "John Doe",
		title: "",
		topic: "",
		subjectImage: "",
		postHTML: ""
	};
	const [post, setPost] = useState(initialState);

	const handleChange = ({ name, value }) => {
		setPost({ ...post, [name]: value });
	};

	const [postBody, setPostBody] = useState("");
	const [postIsSubmitted, setPostIsSubmitted] = useState(false);

	const handleEditorChange = (e) => {
		setPost({ ...post, ["postHTML"]: e.target.getContent() });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.table(post);

		const newPost = new Post(
			post.author,
			post.topic,
			post.title,
			post.subjectImage,
			post.postHTML
		);
		newPost.save();
		setPostIsSubmitted(true);
	};

	return (
		<Container className="pt-3 mb-5">
			<h1 className="my-5">Write Somthing...</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						name="title"
						type="text"
						onChange={(e) => handleChange(e.target)}
					/>
					<Form.Text className="text-muted">
						This will appear at the preview of the post.
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="topic">
					<Form.Label>Topic</Form.Label>
					<Form.Select name="topic" onChange={(e) => handleChange(e.target)}>
						<option>Money</option>
						<option>Technology</option>
						<option>Business</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3" controlId="subjectImage">
					<Form.Label>Subject Image</Form.Label>
					<Form.Control
						name="subjectImage"
						type="text"
						placeholder="Enter image source from URL"
						onChange={(e) => handleChange(e.target)}
					/>
					<Form.Text className="text-muted">
						This will appear at the preview of the post.
					</Form.Text>
				</Form.Group>
				<Editor
					apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
					initialValue="<p>Write your post here...</p>"
					init={{
						height: 500,
						menubar: false,
						plugins: [
							"advlist autolink lists link image charmap print preview anchor",
							"searchreplace visualblocks code fullscreen",
							"insertdatetime media table paste code help wordcount",
							"emoticons media image"
						],
						toolbar:
							"undo redo | formatselect | " +
							"bold italic backcolor | alignleft aligncenter " +
							"alignright alignjustify | bullist numlist outdent indent | " +
							"removeformat | help |" +
							"emoticons | " +
							"media |" +
							"image",
						content_style:
							"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
					}}
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

// Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
