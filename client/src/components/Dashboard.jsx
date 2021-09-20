import { runInAction } from "mobx";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Tab, Nav, Spinner } from "react-bootstrap";
import { StoreContext } from "../stores/RootStore";
import PostPreview from "./PostPreview";
import { observer } from "mobx-react";

const Dashboard = observer(() => {
	const { user } = useContext(StoreContext);

	const [isLoading, setIsLoading] = useState(true);
	const [myPosts, setMyPosts] = useState([]);
	const [readingList, setReadingList] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await user.getPosts();
				setIsLoading(false);
				setMyPosts(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [user]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await user.getReadingList();
				setIsLoading(false);
				setReadingList(data);
				runInAction(() => (user.activity.savedForLater = data));
			} catch (error) {
				console.log(error);
			}
		})();
	}, [user]);

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
									<Nav.Link eventKey="readingList">Reading List</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="myPosts">
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
										)}
									</Row>
								</Tab.Pane>
								<Tab.Pane eventKey="readingList">
									<Row>
										<h2>Reading List</h2>
										{isLoading ? (
											<Spinner
												animation="border"
												className="d-block mx-auto"
											/>
										) : readingList.length ? (
											readingList.map((post) => (
												<PostPreview key={post._id} post={post} />
											))
										) : (
											<p>You have no items yet...</p>
										)}
									</Row>
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
		</div>
	);
});

export default Dashboard;
