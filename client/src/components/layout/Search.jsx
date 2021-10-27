import React, { useEffect, useRef, useState } from "react";
import { Col, FormControl, InputGroup, Row, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";

const Search = ({ isMobile, setDisplaySearch }) => {
	const [keyWord, setKeyWord] = useState("");
	const inputRef = useRef();
	const history = useHistory();

	useEffect(() => {
		// focus on the input as it renders
		inputRef.current.focus();
	}, []);

	const search = (e) => {
		e.preventDefault();
		history.push(`/search?=${keyWord}`);
		setKeyWord("");
	};

	return (
		<Row className="">
			<Col md={11} className="px-xs-3">
				<Form className="d-flex" onSubmit={search}>
					<InputGroup
						style={mobileStyle}
						size={isMobile && "sm"}
						onBlur={() => isMobile && setDisplaySearch(false)}
					>
						{isMobile && (
							<Button
								variant="light"
								type="button"
								onClick={() => setDisplaySearch(false)}
							>
								<i className="fas fa-long-arrow-alt-left"></i>
							</Button>
						)}

						<FormControl
							id="search"
							ref={inputRef}
							type="search"
							placeholder="Search..."
							aria-label="Search"
							value={keyWord}
							onChange={(e) => setKeyWord(e.target.value)}
						/>
						{!isMobile && (
							<Button variant="light" type="submit">
								<i className="fas fa-search"></i>
							</Button>
						)}
					</InputGroup>
				</Form>
			</Col>
		</Row>
	);
};

const mobileStyle = {
	margin: "auto",
	width: "95%"
};

export default Search;
