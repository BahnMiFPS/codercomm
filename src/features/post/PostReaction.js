import { IconButton, Stack, Typography } from "@mui/material"

import React from "react"
import { useDispatch } from "react-redux"
import { sendPostReaction } from "./postSlice"
import { ThumbDownAltRounded, ThumbUpRounded } from "@mui/icons-material"

function PostReaction({ post }) {
	const dispatch = useDispatch()

	const handleClick = (emoji) => {
		console.log(emoji)
		// dispatch(sendPostReaction({ postId: post._id, emoji }))
	}

	return (
		<Stack direction="row" alignItems="center">
			<IconButton onClick={() => handleClick("like")}>
				<ThumbUpRounded sx={{ fontSize: 20, color: "primary.main" }} />
			</IconButton>
			<Typography variant="h6" mr={1}>
				{post?.reactions?.like}
			</Typography>

			<IconButton onClick={() => handleClick("dislike")}>
				<ThumbDownAltRounded sx={{ fontSize: 20, color: "error.main" }} />
			</IconButton>
			<Typography variant="h6">{post?.reactions?.dislike}</Typography>
		</Stack>
	)
}

export default PostReaction
