import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Alert, Tab, Image, Spinner } from "react-bootstrap";
import { StoreContext } from "../../stores/RootStore";

import Axios from "axios";

const ProfileTab = ({ history }) => {
	const initialState = {
		profileImage: "",
		first_name: "",
		last_name: "",
		initials: "",
		email: "",
		password: ""
	};

	const { user } = useContext(StoreContext);

	const [profile, setProfile] = useState(initialState);
	const [file, setFile] = useState(null);
	const [filePath, setFilePath] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	useEffect(() => {
		try {
			(async () => {
				const { data } = await user.getLoggedInUser();
				setProfile(data);
			})();
		} catch (error) {
			console.log(error);
		}
	}, [user]);

	const [newUser, setNewUser] = useState(initialState);

	const [error, setError] = useState(null);

	const handleChange = ({ name, value }) => {
		setNewUser({ ...newUser, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	};

	const onImageChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		setFile(file);
		setFilePath(URL.createObjectURL(file));
		console.log(URL.createObjectURL(file).split("blob:")[1]);
	};

	const uploadImage = async () => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
		formData.append("folder", "blog");

		try {
			setIsUploading(true);
			const { data } = await Axios.post(
				` https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
				formData
			);
			setIsUploading(false);
			console.log(data);
			setProfile({ ...profile, profileImage: data.url });
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
	};

	const { profileImage, first_name, last_name, email } = profile;

	return (
		<Tab.Pane eventKey="profile">
			<Row>
				<Container>
					<Row className="justify-content-center">
						<Col md={6}>
							{error && (
								<Alert className="mt-5" variant="danger">
									{error}
								</Alert>
							)}
							<Form>
								{!file ? (
									<Image
										className="d-block mx-auto mb-3"
										src={
											"https://romancebooks.co.il/wp-content/uploads/2019/06/default-user-image.png"
										}
										width="150px"
										roundedCircle
									/>
								) : (
									<Image
										className="d-block mx-auto mb-3 "
										src={filePath}
										width="150px"
										height="150px"
										roundedCircle
										style={{ objectFit: "unset" }}
									/>
								)}
								<Form.Group className="mb-4 d-inline" controlId="first_name">
									<Form.Label className="d-block">Profile Image</Form.Label>
									<input
										type="file"
										accept="image/*"
										onChange={(e) => onImageChange(e)}
									/>
								</Form.Group>
								<Button variant="dark" onClick={uploadImage} disabled={isUploading}>
									{isUploading ? (
										<>
											<Spinner as="span" size="sm" animation="border" />
											<span className="mx-1">uploading...</span>
										</>
									) : (
										"Update"
									)}
								</Button>
							</Form>

							<hr />

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
