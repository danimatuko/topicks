import React, { useContext, useEffect, useState } from "react";
import { Row, Tab, Spinner, Table } from "react-bootstrap";
import { StoreContext } from "../../stores/RootStore";
import PostRow from "../PostRow";
import PostsTable from "../PostsTable";

const MyPostsTab = () => {
	const { user } = useContext(StoreContext);

	const [isLoading, setIsLoading] = useState(true);
	const [myPosts, setMyPosts] = useState([]);
	const [isDeleted, setIsDeleted] = useState(false);

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
	}, [user, isDeleted]);

	return (
		<Tab.Pane eventKey="myPosts">
			<Row>
				<h2 className="mb-4">My Posts</h2>
				{isLoading ? (
					<Spinner animation="border" className="d-block mx-auto" />
				) : (
					myPosts && (
						<Table striped bordered hover>
							<PostsTable />
							<tbody>
								{myPosts.map((post, index) => (
									<PostRow
										key={post._id}
										post={post}
										index={index}
										editable={true}
										setIsDeleted={setIsDeleted}
									/>
								))}
							</tbody>
						</Table>
					)
				)}
			</Row>
		</Tab.Pane>
	);
};

export default MyPostsTab;
