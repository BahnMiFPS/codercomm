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
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { LoadingButton } from "@mui/lab"

const LoginForm = ({ initialValues, onSubmit, buttonText }) => {
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => {
		setShowPassword((show) => !show)
	}

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Email is invalid")
				.required("Email address is required"),
			password: Yup.string()
				.min(1, "The password must be between 6 and 20 characters")
				.max(20, "The password must be between 6 and 20 characters")
				.required("Password is required"),
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
				<Alert severity="info">
					Don't have an account? — <Link to={"/register"}>Get Started</Link>
				</Alert>
				<TextField
					error={Boolean(formik.touched.email && formik.errors.email)}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.email}
					helperText={formik.touched.email && formik.errors.email}
					variant="standard"
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
					variant="standard"
					margin="normal"
					fullWidth
					name="password"
					label="Password"
					type={showPassword ? "text" : "password"}
					id="password"
					autoComplete="current-password"
				/>
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

export default LoginForm
