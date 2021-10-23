import { runInAction } from "mobx";
import React, { useContext, useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { StoreContext } from "../stores/RootStore";
import User from "../stores/UserStore";

const LoginForm = ({ history }) => {
	const mobileView = window.matchMedia("(max-width: 767px)");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const { user } = useContext(StoreContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			const { data } = await User.login(email, password);
			if (data) {
				runInAction(() => {
					user.id = data.id;
					user.first_name = data.first_name;
					user.last_name = data.last_name;
					user.email = data.email;
					user.role = data.role;
					user.activity = data.activity;
					user.profileImage = data.profileImage;
					user.token = data.token;
					user.isAuth = true;
				});
				history.push("/");
			}
		} catch (error) {
			console.log({ error });
			setError(error.response.data.message || error.message);
		}
	};

	return (
		<Container className="login-page ">
			<Row className="justify-content-center">
				<Col md={4}>
					{error && (
						<Alert className="mt-5" variant="danger">
							{error}
						</Alert>
					)}

					<h1 className="display-5 mt-5 mb-4 text-primary">Login</h1>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="email">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								size={mobileView && "sm"}
								value={email}
								type="email"
								placeholder="Enter email"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								size={mobileView && "sm"}
								value={password}
								type="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
						<Button
							className="w-100"
							variant="dark"
							type="submit"
							size={mobileView && "sm"}
						>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginForm;
