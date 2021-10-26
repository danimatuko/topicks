import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StoreContext } from "../../stores/RootStore";
import Search from "./Search";

const Navigation = observer(() => {
	const { user, comment, post } = useContext(StoreContext);
	const initials = user.first_name.charAt(0) + user.last_name.charAt(0);
	const [displaySearch, setDisplaySearch] = useState(false);

	const logout = () => {
		comment.clear();
		post.clear();
		user.logout();
	};
	const mobileView = window.matchMedia("(max-width: 767px)");

	// const [mobileView, setMobileView] = useState(initialState)
	return (
		<>
			<Navbar bg="primary" variant="dark" className="">
				<Container>
					<Navbar.Brand as={Link} to="/home">
						<img
							src="/logo/Topicks-logos_white.png"
							alt="logo"
							width="85px"
							className="logo p-0 m-0"
						/>
					</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/home" className="main-nav-link">
							Home
						</Nav.Link>
						<Nav.Link as={Link} to="/about" className="main-nav-link">
							About
						</Nav.Link>
					</Nav>
					{mobileView.matches && (
						<Button
							variant="outline-light border-0 me-2"
							type="button"
							onClick={() => setDisplaySearch(true)}
						>
							<i className="fas fa-search"></i>
						</Button>
					)}

					{!mobileView.matches && <Search />}
					{user.id ? (
						<SignedInMenu initials={initials} logout={logout} />
					) : (
						<UnsignedMenu mobileView={mobileView} />
					)}
				</Container>
			</Navbar>
			{mobileView.matches && displaySearch && (
				<Search isMobile={true} setDisplaySearch={setDisplaySearch} />
			)}
		</>
	);
});

const SignedInMenu = observer(({ initials, logout }) => {
	const { user } = useContext(StoreContext);

	return (
		<DropdownButton
			id="dropdown-basic-button"
			align={{ sm: "start" }}
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

const UnsignedMenu = ({ mobileView }) => {
	return (
		<>
			{mobileView.matches ? (
				<DropdownButton
					id="dropdown-basic-button"
					align={{ sm: "start" }}
					variant="secondary"
					menuVariant="dark"
					className="dd-btn"
					title={
						<img
							src="https://romancebooks.co.il/wp-content/uploads/2019/06/default-user-image.png"
							className="dropdown-img"
							alt="user"
						/>
					}
				>
					<Dropdown.Item as={Link} to="/login">
						Sign In
					</Dropdown.Item>
					<Dropdown.Item as={Link} to="/sign-in">
						Register
					</Dropdown.Item>
				</DropdownButton>
			) : (
				<>
					<Button variant="dark" className="me-2 border-light" as={Link} to="/login">
						Sign In
					</Button>
					<Button variant="secondary" as={Link} to="/sign-in">
						Register
					</Button>
				</>
			)}
		</>
	);
};

export default Navigation;
