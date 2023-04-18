import React, { useState } from "react"
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material"
import { fDate } from "../../utils/formatTime"
import CommentReaction from "./CommentReaction"
import useAuth from "../../hooks/useAuth"
import AlertDialog from "../../components/AlertDialog"
import { deleteComment } from "./commentSlice"
import { useDispatch, useSelector } from "react-redux"
import { LoadingButton } from "@mui/lab"
// import CommentReaction from "./CommentReaction"

function CommentCard({ comment, postId }) {
	const { user } = useAuth()
	const dispatch = useDispatch()
	const userId = user._id
	const { isLoading } = useSelector((state) => state.comment)

	const [openDialog, setOpenDialog] = useState(false)
	const handleDeleteButton = () => {
		setOpenDialog(!openDialog)
	}
	const handleDelete = (commentId) => {
		dispatch(deleteComment(commentId, postId))
		setOpenDialog(false)
	}
	return (
		<Stack direction="row" spacing={2}>
			<Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
			<Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.default" }}>
				<Stack
					direction="row"
					alignItems={{ sm: "center" }}
					justifyContent="space-between"
					sx={{ mb: 0.5 }}
				>
					<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
						{comment.author?.name}
					</Typography>
					<Typography variant="caption" sx={{ color: "text.disabled" }}>
						{fDate(comment.createdAt)}
					</Typography>
				</Stack>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					{comment.content}
				</Typography>
				<Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
					<CommentReaction comment={comment} />
					{userId === comment.author._id ? (
						<LoadingButton
							variant="text"
							onClick={handleDeleteButton}
							loading={isLoading}
						>
							Delete
						</LoadingButton>
					) : (
						<></>
					)}
				</Box>
				<AlertDialog
					open={openDialog}
					handleClose={() => setOpenDialog(!openDialog)}
					handleDelete={() => handleDelete(comment._id)}
					title="Delete Comment"
					description="Are you sure you want to delete this comment? This action cannot be undone."
				/>
			</Paper>
		</Stack>
	)
}

export default CommentCard
