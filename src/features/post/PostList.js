import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPost } from "./postSlice"
import PostCard from "./PostCard"

function PostList({ userID }) {
	const [page, setPage] = useState(1)
	const dispatch = useDispatch()
	const posts = useSelector((state) => state.posts)
	useEffect(() => {
		if (userID) {
			dispatch(getPost({ userID, page }))
		}
	}, [dispatch, userID, page])

	return (
		<div>
			{posts?.map((post) => (
				<PostCard post={post} key={post._id} />
			))}
		</div>
	)
}

export default PostList
