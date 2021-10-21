import React, { useState } from "react";
import { Col, FormControl, InputGroup, Row, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";

const Search = () => {
	const [keyWord, setKeyWord] = useState("");

	const history = useHistory();

	const search = (e) => {
		e.preventDefault();
		history.push(`/search?=${keyWord}`);
		setKeyWord("");
	};

	return (
		<Row>
			<Col md={10}>
				<Form className="d-flex" onSubmit={search}>
					<InputGroup size="">
						<FormControl
							type="search"
							placeholder="Search..."
							aria-label="Search"
							value={keyWord}
							onChange={(e) => setKeyWord(e.target.value)}
						/>
						<Button variant="light" type="submit">
							<i className="fas fa-search"></i>
						</Button>
					</InputGroup>
				</Form>
			</Col>
		</Row>
	);
};

export default Search;
