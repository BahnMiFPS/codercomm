import { Container } from "@mui/material"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import LoginForm from "../components/form/LoginForm"
import useAuth from "../hooks/useAuth"

function RegisterPage() {
	let location = useLocation()
	let navigate = useNavigate()
	let from = location.state?.from?.pathname || "/"

	let auth = useAuth()

	const initialValues = {
		email: "",
		password: "",
		remember: true,
	}

	const onSubmit = async (values, { setErrors, setSubmitting }) => {
		try {
			let { email, password } = values
			await auth.login({ email, password }, () => {
				navigate(from, { replace: true })
			})
		} catch (error) {
			console.log(error)
			setErrors({ responseError: error.response.data.errors.message })
		} finally {
			setSubmitting(false)
		}
	}
	return (
		<Container maxWidth="xs">
			<LoginForm
				initialValues={initialValues}
				onSubmit={onSubmit}
				buttonText="Sign In"
			/>
		</Container>
	)
}

export default RegisterPage
