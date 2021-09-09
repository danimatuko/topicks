import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";
import Post from "../Models/Post";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [postBody, setPostBody] = useState("");
	const [postIsDone, setPostIsDone] = useState(false);
	const [postHTML, setPostHTML] = useState(false);

	const handleEditorChange = (e) => {
		setPostBody(e.target.getContent());
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const post = new Post(title, postBody);
		post.save();
		setPostIsDone(true);
	};

	return (
		<Container>
			<h1 className="my-5">Write Somthing...</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="text"
						placeholder="title"
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<Editor
					apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
					initialValue="<p>Initial content</p>"
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
				<Button variant="dark" type="submit">
					Submit
				</Button>
			</Form>
			<div>{postHTML && parse(postHTML)}</div>
		</Container>
	);
};

export default CreatePost;

// Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
