import React from "react";
import { Col, Container, Row, Tab, Nav } from "react-bootstrap";

import MyPostsTab from "./dashboard/MyPostsTab";
import ReadingListTab from "./dashboard/ReadingListTab";

const Dashboard = () => {
	return (
		<div className="dashboard mt-5">
			<Container className="my-5">
				<h1 className="mb-5">Dashboard</h1>
				<Tab.Container id="left-tabs-example" defaultActiveKey="myPosts">
					<Row>
						<Col sm={3}>
							<Nav variant="pills" className="flex-column">
								<Nav.Item className="dashboard-nav-item">
									<Nav.Link eventKey="myPosts">My Posts</Nav.Link>
								</Nav.Item>
								<Nav.Item className="dashboard-nav-item">
									<Nav.Link eventKey="readingList">Reading List</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<MyPostsTab />
								<ReadingListTab />
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
		</div>
	);
};

export default Dashboard;
