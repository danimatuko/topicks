import React from "react";
import { Col, Container, Row, Tab, Nav } from "react-bootstrap";
import useMediaQuery from "../../hooks/useMediaQuery";
import MyPostsTab from "./MyPostsTab";
import ProfileTab from "./ProfileTab";
import ReadingListTab from "./ReadingListTab";

const Dashboard = () => {
	const [isMobileView] = useMediaQuery();

	return (
		<div className="dashboard mt-5">
			<Container className="my-5">
				<h1 className="mb-5">Dashboard</h1>
				<Tab.Container id="" defaultActiveKey="profile">
					<Row>
						<Col sm={3}>
							<Nav
								variant={isMobileView ? "tabs" : "pills"}
								className={isMobileView ? "flex" : "flex-column"}
								fill={isMobileView}
							>
								<Nav.Item className="dashboard-nav-item">
									<Nav.Link className="px-2" eventKey="profile">
										Profile
									</Nav.Link>
								</Nav.Item>
								<Nav.Item className="dashboard-nav-item">
									<Nav.Link className="px-2" eventKey="myPosts">
										My Posts
									</Nav.Link>
								</Nav.Item>
								<Nav.Item className="dashboard-nav-item">
									<Nav.Link className="px-2" eventKey="readingList">
										Reading List
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<ProfileTab />
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
