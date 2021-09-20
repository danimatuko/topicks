import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Image, Row, Button, Form, Tab, Nav, Spinner } from "react-bootstrap";
import Post from "../stores/PostStore";
import { StoreContext } from "../stores/RootStore";
import PostPreview from "./PostPreview";
const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [myPosts, setMyPosts] = useState([]);

	const { user } = useContext(StoreContext);



	useEffect(() => {
		(async () => {
			try {
				const { data } = await user.getMyPosts();
				setIsLoading(false);
				setMyPosts(data);
			} catch (error) {}
		})();
	}, []);

	return (
		<div className="dashboard mt-5">
			<Container className="my-5">
				<h1 className="mb-5">Dashboard</h1>
				<Tab.Container id="left-tabs-example" defaultActiveKey="myPosts">
					<Row>
						<Col sm={3}>
							<Nav variant="pills" className="flex-column">
								<Nav.Item>
									<Nav.Link eventKey="myPosts">My Posts</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">Saved</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="myPosts">
									{" "}
									<Row>
										<h2>My Posts</h2>
										{isLoading ? (
											<Spinner
												animation="border"
												className="d-block mx-auto"
											/>
										) : (
											myPosts &&
											myPosts.map((post) => (
												<PostPreview key={post._id} post={post} />
											))
										)}{" "}
									</Row>{" "}
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
		</div>
	);
};

export default Dashboard;
