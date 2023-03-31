import React, { useState } from "react"
import {
	Alert,
	Box,
	Checkbox,
	FormControlLabel,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Link,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link as RouterLink } from "react-router-dom"
import { LoadingButton } from "@mui/lab"

const FormProvider = ({ initialValues, onSubmit, buttonText }) => {
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => {
		setShowPassword((show) => !show)
	}

	const [showPasswordConfirmation, setShowPasswordConfirmation] =
		useState(false)

	const handleClickShowPasswordConfirmation = () => {
		setShowPasswordConfirmation((show) => !show)
	}
	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			name:
				buttonText === "Register"
					? Yup.string().required("Name is required")
					: Yup.string(),
			email: Yup.string()
				.email("Email is invalid")
				.required("Email address is required"),
			password: Yup.string()
				.min(1, "The password must be between 6 and 20 characters")
				.max(20, "The password must be between 6 and 20 characters")
				.required("Password is required"),
			passwordConfirmation:
				buttonText === "Register"
					? Yup.string()
							.required("Please retype your password.")
							.oneOf([Yup.ref("password")], "Your passwords do not match.")
					: Yup.string(),
		}),
		onSubmit: onSubmit,
		validateOnChange: false,
		validateOnBlur: false,
	})

	return (
		<Box
			component={"form"}
			className="form-container"
			onSubmit={formik.handleSubmit}
		>
			<Stack spacing={2}>
				{formik.errors.responseError && (
					<Alert severity="error">{formik.errors.responseError}</Alert>
				)}

				{buttonText === "Register" ? (
					<>
						<Alert severity="info">
							Already got an account? —{" "}
							<Link to={"/login"} component={RouterLink}>
								Login Instead
							</Link>
						</Alert>
						<TextField
							error={Boolean(formik.touched.name && formik.errors.name)}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.name}
							helperText={formik.touched.name && formik.errors.name}
							margin="normal"
							fullWidth
							id="name"
							label="Name"
							name="name"
							autoComplete="off"
						/>
					</>
				) : (
					<Alert severity="info">
						Don't have an account? —{" "}
						<Link component={RouterLink} to={"/register"}>
							Get Started
						</Link>
					</Alert>
				)}
				<TextField
					error={Boolean(formik.touched.email && formik.errors.email)}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.email}
					helperText={formik.touched.email && formik.errors.email}
					margin="normal"
					fullWidth
					id="email"
					label="Email"
					name="email"
					autoComplete="off"
				/>
				<TextField
					error={Boolean(formik.touched.password && formik.errors.password)}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.password}
					helperText={formik.touched.password && formik.errors.password}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									edge="end"
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
					margin="normal"
					fullWidth
					name="password"
					label="Password"
					type={showPassword ? "text" : "password"}
					id="password"
					autoComplete="current-password"
				/>
				{buttonText === "Register" ? (
					<TextField
						error={Boolean(
							formik.touched.passwordConfirmation &&
								formik.errors.passwordConfirmation
						)}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.passwordConfirmation}
						helperText={
							formik.touched.passwordConfirmation &&
							formik.errors.passwordConfirmation
						}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password confirmation visibility"
										onClick={handleClickShowPasswordConfirmation}
										edge="end"
									>
										{showPasswordConfirmation ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						margin="normal"
						fullWidth
						name="passwordConfirmation"
						label="Password Confirmation"
						type={showPasswordConfirmation ? "text" : "password"}
						id="passwordConfirmation"
						autoComplete="current-password-confirmation"
					/>
				) : (
					<></>
				)}
				<FormControlLabel
					control={
						<Checkbox
							value={formik.values.remember}
							color="primary"
							checked={formik.values.remember}
							onChange={(event) =>
								formik.setFieldValue("remember", event.target.checked)
							}
						/>
					}
					label="Remember Me"
					className="remember-me"
				/>
				<LoadingButton
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					loading={formik.isSubmitting}
				>
					{buttonText}
				</LoadingButton>
			</Stack>
		</Box>
	)
}

export default FormProvider
