import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container, Nav, Navbar, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StoreContext } from "../stores/RootStore";

const Navigation = observer(() => {
	const { user } = useContext(StoreContext);
	const initials = user.first_name.charAt(0) + user.last_name.charAt(0);

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
				{user.id ? <SignedInMenu initials={initials} /> : <UnsignedMenu />}
			</Container>
		</Navbar>
	);
});

const SignedInMenu = ({ initials }) => {
	return (
		<DropdownButton
			id="dropdown-basic-button"
			title={initials}
			variant="secondary"
			menuVariant="dark"
		>
			<Dropdown.Item as={Link} to="/post">
				Write somthing
			</Dropdown.Item>
			<Dropdown.Item as={Link} to="/profile">
				Profile
			</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item>Logout</Dropdown.Item>
		</DropdownButton>
	);
};

const UnsignedMenu = () => {
	return (
		<>
			<Button variant="dark" className="me-2 border-light" as={Link} to="/login">
				Sign In
			</Button>
			<Button variant="secondary" as={Link} to="/sign-in">
				Create Account
			</Button>
		</>
	);
};
export default Navigation;
