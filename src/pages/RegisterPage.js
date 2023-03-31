import { Container } from "@mui/material"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import LoginForm from "../components/form/LoginForm"
import useAuth from "../hooks/useAuth"

function LoginPage() {
	let location = useLocation()
	let navigate = useNavigate()

	let auth = useAuth()
	const initialValues = {
		name: "",
		email: "",
		password: "",
		remember: true,
	}

	const onSubmit = async (values, { setErrors, setSubmitting }) => {
		const from = location.state?.from?.pathname || "/"
		let { name, email, password } = values

		try {
			await auth.register({ name, email, password }, () => {
				navigate(from, { replace: true })
			})
		} catch (error) {
			setErrors({ responseError: error.message })
		} finally {
			setSubmitting(false)
		}
	}
	return (
		<Container maxWidth="xs">
			<LoginForm
				initialValues={initialValues}
				onSubmit={onSubmit}
				buttonText="Register"
			/>
		</Container>
	)
}

export default LoginPage
