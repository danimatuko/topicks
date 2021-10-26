import React from "react";
import { Pagination } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ total, page, path }) => {
	const location = useLocation();
	path = path || location.pathname;
	console.log(path);
	if (total <= 1) return null;

	return (
		<Pagination className="justify-content-center my-3">
			{[...Array(Math.ceil(total)).keys()].map((p) => (
				<LinkContainer key={p} to={`/${path}/?page=${p + 1}`}>
					<Pagination.Item
						className="text-dark"
						active={p + 1 === Number(page)}
					>
						{p + 1}
					</Pagination.Item>
				</LinkContainer>
			))}
		</Pagination>
	);
};

export default Paginate;
