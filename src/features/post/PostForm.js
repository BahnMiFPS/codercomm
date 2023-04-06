import { Box, Card, Stack, TextField } from "@mui/material"
import React from "react"
import * as Yup from "yup"
import { useFormik } from "formik"
import { LoadingButton } from "@mui/lab"
import { createPost } from "./postSlice"
import { useDispatch, useSelector } from "react-redux"

function PostForm() {
	const dispatch = useDispatch()
	const initialValues = {
		content: "",
		image: "",
	}
	const { isLoading, error } = useSelector((state) => state.post)
	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			content: Yup.string().required("Put some shit in here yo"),
		}),
		onSubmit: (data, { setSubmitting, resetForm, setErrors }) => {
			dispatch(createPost(data))
				.then(() => {
					resetForm()
				})
				.catch((error) => {
					setErrors(error)
				})
		},
		validateOnChange: false,
		validateOnBlur: false,
	})

	return (
		<Card sx={{ p: 3 }} component={"form"} onSubmit={formik.handleSubmit}>
			<Stack spacing={2}>
				<TextField
					placeholder="Share what you are thinking here..."
					error={Boolean(formik.touched.content && formik.errors.content)}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.content}
					helperText={formik.touched.content && formik.errors.content}
					margin="normal"
					fullWidth
					variant="outlined"
					multiline
					rows={4}
					id="content"
					name="content"
					autoComplete="off"
				/>
				<TextField
					placeholder="Image URL here"
					error={Boolean(formik.touched.image && formik.errors.image)}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.image}
					helperText={formik.touched.image && formik.errors.image}
					variant="outlined"
					margin="normal"
					fullWidth
					id="image"
					name="image"
					autoComplete="off"
				/>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
					<LoadingButton
						type="submit"
						variant="contained"
						color="primary"
						loading={formik.isSubmitting || isLoading}
					>
						Post
					</LoadingButton>
				</Box>
			</Stack>
		</Card>
	)
}

export default PostForm
