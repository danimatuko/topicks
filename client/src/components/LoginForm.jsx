import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { StoreContext } from "../stores/rootStore";
import User from "../stores/User";

const LoginForm = observer(() => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const store = useContext(StoreContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await User.login(email, password);
			if (data) {
				runInAction(() => {
					store.user.id = data.id;
					store.user.first_name = data.first_name;
					store.user.last_name = data.last_name;
					store.user.email = data.email;
					store.user.role = data.role;
				});
			}
		} catch (error) {
			console.log(error);
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
});

export default LoginForm;
