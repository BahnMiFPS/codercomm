import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPost } from "./postSlice"
import PostCard from "./PostCard"
import { LoadingButton } from "@mui/lab"
import { Grid, Stack, Typography } from "@mui/material"

function PostList({ userID }) {
	const [page, setPage] = useState(1)
	const dispatch = useDispatch()
	const { currentPagePosts, postsByID, totalPosts, isLoading } = useSelector(
		(state) => state.post
	)

	const posts = currentPagePosts.map((postID) => postsByID[postID])

	useEffect(() => {
		if (userID) {
			dispatch(getPost({ userID, page }))
		}
	}, [dispatch, userID, page])

	return (
		<div>
			{posts.map((post) => (
				<PostCard post={post} key={post._id} />
			))}
			<Grid container justifyContent={"center"}>
				<Grid item>
					{totalPosts ? (
						<LoadingButton
							variant="outlined"
							size="small"
							loading={isLoading}
							onClick={() => {
								setPage((page) => page + 1)
							}}
							disabled={Boolean(totalPosts && posts.length >= totalPosts)}
						>
							Load More
						</LoadingButton>
					) : (
						<Typography> no post yet</Typography>
					)}
				</Grid>
			</Grid>
		</div>
	)
}

export default PostList
