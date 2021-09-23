import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { commentEditorConfig } from "../tinymce.config";

const handleEditorChange = () => {};

const CommentForm = () => {
	return (
		<div className="mb-5">
			<Editor
				apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
				initialValue={""}
				init={commentEditorConfig}
				onChange={(e) => handleEditorChange(e)}
			/>
		</div>
	);
};

export default CommentForm;
