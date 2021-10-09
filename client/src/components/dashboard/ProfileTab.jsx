import { runInAction } from "mobx";
import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Alert, Tab, Image } from "react-bootstrap";
import { getNameInitials } from "../../helpers/getNameIntials";
import { StoreContext } from "../../stores/RootStore";
import User from "../../stores/UserStore";

const ProfileTab = ({ history }) => {
	const initialState = {
		profilePic: "",
		first_name: "",
		last_name: "",
		initials: "",
		email: "",
		password: ""
	};
	const [profile, setProfile] = useState(initialState);

	useEffect(() => {
		try {
			(async () => {
				const { data } = await user.getLoggedInUser();
				setProfile(data);
				console.log(data);
			})();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const [newUser, setNewUser] = useState(initialState);

	const [error, setError] = useState(null);

	const { user } = useContext(StoreContext);

	const handleChange = ({ name, value }) => {
		setNewUser({ ...newUser, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			const { data } = await User.signUp(first_name, last_name, email, password);
			if (data) {
				runInAction(() => {
					user.id = data.id;
					user.first_name = data.first_name.charAt(0).toUpperCase() + first_name.slice(1);
					user.last_name = data.last_name.charAt(0).toUpperCase() + last_name.slice(1);
					user.email = data.email;
					user.role = data.role;
				});
				history.push("/");
			}
		} catch (error) {
			console.log({ error });
			setError(error.response.data.message || error.message);
		}
	};

	const { profilePic, first_name, last_name, email, password } = profile;
	const initials = getNameInitials(first_name, last_name);

	return (
		<Tab.Pane eventKey="profile">
			<Row>
				<Container>
					<Row className="justify-content-center">
						<Col md={5}>
							{error && (
								<Alert className="mt-5" variant="danger">
									{error}
								</Alert>
							)}
							{profilePic ? (
								<Image
									className="d-block mx-auto mb-3"
									src="https://romancebooks.co.il/wp-content/uploads/2019/06/default-user-image.png"
									width="150px"
									roundedCircle
								/>
							) : (
								<div className="profile-initials mx-auto mb-3">{initials}</div>
							)}

							<Form onSubmit={handleSubmit}>
								<Form.Group className="mb-3" controlId="first_name">
									<Form.Label>First Name</Form.Label>
									<Form.Control
										name="first_name"
										value={first_name}
										type="text"
										onChange={(e) => handleChange(e.target)}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="last_name">
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										name="last_name"
										value={last_name}
										type="text"
										onChange={(e) => handleChange(e.target)}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="email">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										disabled
										name="email"
										value={email}
										type="email"
										onChange={(e) => handleChange(e.target)}
									/>
									<Form.Text className="text-muted">
										We'll never share your email with anyone else.
									</Form.Text>
								</Form.Group>

								<Button className="w-100" variant="dark" type="submit">
									Submit
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</Row>
		</Tab.Pane>
	);
};

export default ProfileTab;
