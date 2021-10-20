import React from "react";
import { Link } from "react-router-dom";

const ForbiddenPage = () => {
	return (
		<div
			className="d-flex  flex-column justify-content-center align-items-center"
			style={{ height: "50vh" }}
		>
			<h1 className="display-1">403</h1>
			<p className="lead">You are not allowed to view this page</p>
			<Link className="text-dark" to="/home">
				<i className="fas fa-long-arrow-alt-left align-middle"></i>
				<span className="ms-1 h6 align-middle">Home</span>
			</Link>
		</div>
	);
};

export default ForbiddenPage;
