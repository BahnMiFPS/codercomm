import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Checkbox,
	Container,
	createTheme,
	FormControlLabel,
	Grid,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material"

import React from "react"
import { useTheme } from "styled-components"
import { useFormik } from "formik"
import "./Form.css"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import * as Yup from "yup"
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

function RegisterForm() {
	let location = useLocation()
	let navigate = useNavigate()
	let from = location.state?.from?.pathname || "/"

	let auth = useAuth()
	const [showPassword, setShowPassword] = React.useState(false)

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}
	const flexDisplayCenter = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 2,
	}
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Name is required"),
			email: Yup.string()
				.email("Email is invalid")
				.required("Email address is required"),
			password: Yup.string()
				.min(6, "The password must be between 6 and 20 characters")
				.max(20, "The password must be between 6 and 20 characters")
				.required("Password is required"),
		}),

		onSubmit: async (values) => {
			console.log(auth)
			let { name, email, password } = values
			await auth.signup({ name, email, password }, () => {
				navigate(from, { replace: true })
			})
		},
		validateOnChange: false,
		validateOnBlur: false,
	})
	return (
		<Container
			component={"form"}
			className="form-container"
			onSubmit={formik.handleSubmit}
		>
			<Grid sx={flexDisplayCenter}>
				<Box>
					<TextField
						error={Boolean(formik.touched.name && formik.errors.name)}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.name}
						helperText={formik.touched.name && formik.errors.name}
						variant="filled"
						margin="normal"
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoComplete="off"
					/>
					<TextField
						error={Boolean(formik.touched.email && formik.errors.email)}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.email}
						helperText={formik.touched.email && formik.errors.email}
						variant="filled"
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
										onClick={() => setShowPassword(!showPassword)}
										edge="end"
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
						variant="filled"
						margin="normal"
						fullWidth
						name="password"
						label="Password"
						type={showPassword ? "text" : "password"}
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember Me"
						className="remember-me"
					/>
					<Button type="submit" fullWidth variant="contained" color="primary">
						Sign Up
					</Button>
				</Box>
			</Grid>
		</Container>
	)
}

export default RegisterForm
