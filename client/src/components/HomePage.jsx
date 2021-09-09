import React from "react";
import { Container, Row ,Col} from "react-bootstrap";
import Hero from "./Hero";
import PostPreview from "./PostPreview";
import RecommandedTopics from "./RecommandedTopics";

const HomePage = () => {
	return (
		<>
			<Hero />
			<Container>
				<Row className="mt-5">
					<Col md={8}>
						<h2 className="display-4 mb-4 fw-bold text-secondary">Latest</h2>
						<PostPreview />
						<PostPreview />
						<PostPreview />
					</Col>
					<Col md={4}>
						<RecommandedTopics />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default HomePage;
