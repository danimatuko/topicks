import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Container, Nav, Navbar, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StoreContext } from "../../stores/RootStore";
import Search from "./Search";

const Navigation = observer(() => {
	const { user, comment, post } = useContext(StoreContext);
	const initials = user.first_name.charAt(0) + user.last_name.charAt(0);

	const logout = () => {
		comment.clear();
		post.clear();
		user.logout();
	};

	return (
		<Navbar bg="dark" variant="dark" className="pt-3">
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
					</Nav.Link>{" "}
					<Nav.Item></Nav.Item>
				</Nav>
				<Search />
				{user.id ? <SignedInMenu initials={initials} logout={logout} /> : <UnsignedMenu />}
			</Container>
		</Navbar>
	);
});

const SignedInMenu = observer(({ initials, logout }) => {
	const { user } = useContext(StoreContext);
	const defaultProfileImage =
		"https://romancebooks.co.il/wp-content/uploads/2019/06/default-user-image.png";

	return (
		<DropdownButton
			id="dropdown-basic-button"
			title={
				!user.profileImage ? (
					initials
				) : (
					<img src={user.profileImage} className="dropdown-img" alt="profile" />
				)
			}
			variant="secondary"
			menuVariant="dark"
		>
			<Dropdown.Item as={Link} to="/post">
				Write somthing
			</Dropdown.Item>
			<Dropdown.Item as={Link} to="/dashboard">
				Dashboard
			</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
		</DropdownButton>
	);
});

const UnsignedMenu = () => {
	return (
		<>
			<Button variant="dark" className="me-2 border-light" as={Link} to="/login">
				Sign In
			</Button>
			<Button variant="secondary" as={Link} to="/sign-in">
				Register
			</Button>
		</>
	);
};

export default Navigation;
