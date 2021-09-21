import React, { useContext, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import Post from "../stores/PostStore";
import { StoreContext } from "../stores/RootStore";

const CreatePost = ({ history }) => {
	const { user } = useContext(StoreContext);
	const [error, setError] = useState(null);

	const initialState = {
		userId: "",
		author: user.first_name + " " + user.last_name,
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
		setPost({ ...post, postHTML: e.target.getContent() });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.table(post);

		const newPost = new Post(
			user.id,
			post.author,
			post.topic,
			post.title,
			post.subjectImage,
			post.postHTML
		);

		try {
			await newPost.save();
			history.push("/");
		} catch (error) {
			console.log({ error });
			setError(error.response.data.message);
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
					<Form.Select name="topic" onChange={(e) => handleChange(e.target)}>
						<option>Money</option>
						<option>Technology</option>
						<option>Business</option>
						<option>Mindfulness</option>
						<option>Art</option>
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
						This will appear at the preview of the post
					</Form.Text>
				</Form.Group>
				<Form.Label>
					<span className="text-danger me-1">*</span>Body
				</Form.Label>
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
