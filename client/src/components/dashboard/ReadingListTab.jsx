import { runInAction } from "mobx";
import React, { useContext, useEffect, useState } from "react";
import { Row, Tab,Spinner, Table } from "react-bootstrap";
import { StoreContext } from "../../stores/RootStore";
import PostRow from "../PostRow";
import PostsTable from "../PostsTable";

const ReadingListTab = () => {
	const { user } = useContext(StoreContext);
	const [isLoading, setIsLoading] = useState(true);

	const [readingList, setReadingList] = useState([]);

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
		<Tab.Pane eventKey="readingList">
			<Row>
				<h2 className="mb-4">Reading List</h2>
				{isLoading ? (
					<Spinner animation="border" className="d-block mx-auto" />
				) : (
					readingList && (
						<Table striped bordered hover>
							<PostsTable />
							<tbody>
								{readingList.map((post, index) => (
									<PostRow
										key={post._id}
										post={post}
										index={index}
										editable={false}
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

export default ReadingListTab;
