const PostsTable = ({ editable }) => {
	return (
		<thead>
			<tr>
				{editable && <th></th>}
				<th>#</th>
				<th></th>
				<th>Title</th>
				<th>Date</th>
				<th>Topic</th>
				<th>Views</th>
				<th>Likes</th>
				<th>Comments</th>
			</tr>
		</thead>
	);
};

export default PostsTable;
