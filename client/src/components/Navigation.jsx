import React from "react";
import { Container, Nav, Navbar, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand as={Link} to="/home">
					BLOG
				</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link as={Link} to="/home">
						Home
					</Nav.Link>
					<Nav.Link as={Link} to="/about">
						About
					</Nav.Link>
				</Nav>
				<DropdownButton
					id="dropdown-basic-button"
					title="D"
					variant="secondary"
					menuVariant="dark"
				>
					<Dropdown.Item as={Link} to="/post">
						Write somthing
					</Dropdown.Item>
					<Dropdown.Item as={Link} to="#/action-2">
						Another action
					</Dropdown.Item>
					<Dropdown.Item as={Link} to="#/action-3">
						Something else
					</Dropdown.Item>
				</DropdownButton>
			</Container>
		</Navbar>
	);
};

export default Navigation;
