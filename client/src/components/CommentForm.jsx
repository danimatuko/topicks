import { Editor } from "@tinymce/tinymce-react";
import React, { useContext, useState } from "react";
import { getDate } from "../helpers/getDate";
import { StoreContext } from "../stores/RootStore";
import { commentEditorConfig } from "../tinymce.config";
import { Alert, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { runInAction } from "mobx";

const CommentForm = ({ commentSuccsess, setCommentSuccsess }) => {
	const { user, comment } = useContext(StoreContext);
	const { id } = useParams();

	const initialState = {
		postId: id,
		userId: user.id,
		author: user.first_name + " " + user.last_name,
		commentBody: "",
		dateOfComment: getDate()
	};

	const [commentState, setCommentState] = useState(initialState);
	const [error, setError] = useState(null);
	//	const [commentSuccsess, setCommentSuccsess] = useState(false);

	const handleEditorChange = (e) => {
		setCommentState({ ...commentState, commentBody: e.target.getContent() });
	};

	const addComment = async (e) => {
		e.preventDefault();
		setCommentSuccsess(false);
		const { userId, author, commentBody, dateOfComment } = commentState;

		runInAction(() => {
			comment.postId = id;
			comment.userId = userId;
			comment.author = author;
			comment.commentBody = commentBody;
			comment.dateOfComment = dateOfComment;
		});

		try {
			const { data } = await comment.save();
			data && setCommentSuccsess(true); // rerender form  and comments on succsess
		} catch (error) {
			console.log({ error });
			setError(error.response.data.message);
		}
	};

	return (
		<div className="mb-5">
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={addComment}>
				<Editor
					key={commentSuccsess} // react key to rerneder the form on submit
					apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
					initialValue={""}
					init={commentEditorConfig}
					onChange={(e) => handleEditorChange(e)}
				/>
				<Button type="submit" variant="dark " className="w-100 mt-1">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default CommentForm;
