import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import Post from "../stores/Post";

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
						<option>Mindfulness</option>
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
							"emoticons media image fontsizeselect"
						],
						font_formats: ["8pt 10pt 12pt 14pt 18pt 24pt 36pt"],
						toolbar:
							"undo redo | formatselect | fontsizeselect |" +
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
