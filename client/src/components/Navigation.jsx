import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/home">BLOG</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="/home">Home</Nav.Link>
					<Nav.Link href="/about">About</Nav.Link>
				</Nav>
				<Button as={Link} to="/post" variant="light">
					<i className="fas fa-plus me-1"></i>
					<span>Post</span>
				</Button>
			</Container>
		</Navbar>
	);
};

export default Navigation;
