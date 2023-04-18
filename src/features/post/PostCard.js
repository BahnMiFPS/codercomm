import React, { useCallback, useState } from "react"
import {
	Box,
	Link,
	Card,
	Stack,
	Avatar,
	Typography,
	CardHeader,
	IconButton,
	Menu,
	MenuItem,
	alpha,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { fDate } from "../../utils/formatTime"

import MoreVertIcon from "@mui/icons-material/MoreVert"
import PostReaction from "./PostReaction"
import CommentForm from "../comment/CommentForm"
import CommentList from "../comment/CommentList"
import useAuth from "../../hooks/useAuth"

import { FormProvider, FTextField, FUploadImage } from "../../components/form"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { createPost, deletePost, editPost } from "./postSlice"
import { LoadingButton } from "@mui/lab"
import { reset } from "numeral"
import AlertDialog from "../../components/AlertDialog"

function PostCard({ post }) {
	const { user } = useAuth()
	const [openDialog, setOpenDialog] = useState(false)

	const userId = user._id
	console.log("post shit", post)
	const [anchorEl, setAnchorEl] = useState(null)
	const [toggleEdit, setToggleEdit] = useState(false)
	const isMenuOpen = Boolean(anchorEl)
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleEditButton = () => {
		setToggleEdit(!toggleEdit)
		setAnchorEl(null)
	}
	const handleDeleteButton = () => {
		setOpenDialog(!openDialog)
	}

	const handleDelete = (postId) => {
		dispatch(deletePost(postId)).then(() => handleMenuClose())
		setOpenDialog(false)
	}
	const yupSchema = Yup.object().shape({
		content: Yup.string().required("Content is required"),
	})

	const defaultValues = {
		content: post.content,
		image: post?.image,
	}
	const { isLoading } = useSelector((state) => state.post)

	const methods = useForm({
		resolver: yupResolver(yupSchema),
		defaultValues,
	})
	const {
		handleSubmit,
		setValue,
		formState: { isSubmitting },
	} = methods
	const dispatch = useDispatch()

	const handleDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0]

			if (file) {
				setValue(
					"image",
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			}
		},
		[setValue]
	)

	const onSubmit = (data, postId) => {
		dispatch(editPost(data, postId)).then(() => handleEditButton())
	}
	return (
		<Card sx={{ mb: 3 }}>
			<CardHeader
				disableTypography
				avatar={
					<Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
				}
				title={
					<Link
						variant="subtitle2"
						color="text.primary"
						component={RouterLink}
						sx={{ fontWeight: 600 }}
						to={`/user/${post.author._id}`}
					>
						{post?.author?.name}
					</Link>
				}
				subheader={
					<Typography
						variant="caption"
						sx={{ display: "block", color: "text.secondary" }}
					>
						{fDate(post.createdAt)}
					</Typography>
				}
				action={
					<>
						{userId === post?.author?._id ? (
							<Box>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<MoreVertIcon sx={{ fontSize: 30 }} />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorEl)}
									onClose={handleMenuClose}
								>
									<MenuItem onClick={handleEditButton}>Edit</MenuItem>
									<MenuItem onClick={() => handleDeleteButton(post._id)}>
										Delete
									</MenuItem>
								</Menu>
							</Box>
						) : (
							<></>
						)}
					</>
				}
			/>

			<Stack spacing={2} sx={{ p: 3 }}>
				{toggleEdit ? (
					<FormProvider
						methods={methods}
						onSubmit={handleSubmit((data) => onSubmit(data, post._id))}
					>
						<Stack spacing={2}>
							<FTextField
								name="content"
								multiline
								fullWidth
								rows={4}
								placeholder="Share what you are thinking here..."
								sx={{
									"& fieldset": {
										borderWidth: `1px !important`,
										borderColor: alpha("#919EAB", 0.32),
									},
								}}
							/>

							<FUploadImage
								name="image"
								accept="image/*"
								maxSize={3145728}
								onDrop={handleDrop}
							/>

							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-end",
									gap: "1rem",
								}}
							>
								<LoadingButton
									variant="contained"
									size="small"
									color="secondary"
									loading={isSubmitting || isLoading}
									onClick={() => setToggleEdit(!toggleEdit)}
								>
									Cancel
								</LoadingButton>
								<LoadingButton
									type="submit"
									variant="contained"
									size="small"
									loading={isSubmitting || isLoading}
								>
									Finish editing
								</LoadingButton>
							</Box>
						</Stack>
					</FormProvider>
				) : (
					<Typography>{post.content}</Typography>
				)}

				{post.image && (
					<Box
						sx={{
							borderRadius: 2,
							overflow: "hidden",
							height: 300,
							"& img": { objectFit: "cover", width: 1, height: 1 },
						}}
					>
						<img src={post.image} alt="post" />
					</Box>
				)}
				<AlertDialog
					open={openDialog}
					handleClose={() => setOpenDialog(!openDialog)}
					handleDelete={() => handleDelete(post._id)}
					title="Delete Post"
					description="Are you sure you want to delete this post? This action cannot be undone."
				/>
				<PostReaction post={post} />
				<CommentList postId={post._id} />
				<CommentForm postId={post._id} />
			</Stack>
		</Card>
	)
}

export default PostCard
