import React from "react";
import { Col, FormControl, InputGroup, Row, Button, Form } from "react-bootstrap";

const Search = () => {
	return (
		<Row>
			<Col md={11}>
				<Form className="d-flex">
					<InputGroup size="">
						<FormControl type="search" placeholder="Search" aria-label="Search" />
						<Button variant="outline-success">
							<i className="fas fa-search"></i>
						</Button>
					</InputGroup>
				</Form>
			</Col>
		</Row>
	);
};

export default Search;
