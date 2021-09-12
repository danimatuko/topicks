import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import User from "../Models/User";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data } = await User.login(email, password);
		if (data) {
			console.log(data);
			const user = new User(data.id, data.first_name, data.last_name, email, data.role);
		}
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md={4}>
					<h1 className="display-5 mt-5 mb-4">Login</h1>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="email">
							<Form.Label>Email address</Form.Label>
							<Form.Control
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
								value={password}
								type="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
						<Button variant="dark" type="submit">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginForm;
