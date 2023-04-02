import { Container } from "@mui/material"
import React from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import FormProvider from "../components/form/FormProvider"
import useAuth from "../hooks/useAuth"

function LoginPage() {
	let location = useLocation()
	const navigate = useNavigate()
	let auth = useAuth()
	const initialValues = {
		email: "luongquangvu97@gmail.com",
		password: "123",
		remember: true,
	}

	const onSubmit = async (values, { setErrors, setSubmitting }) => {
		const from = location.state?.from?.pathname || "/"
		console.log(from)
		let { email, password } = values

		try {
			await auth.login({ email, password }, () => {
				navigate(from, { replace: true })
			})
			setSubmitting(false)
		} catch (error) {
			setErrors({ responseError: error.message })
			setSubmitting(false)
		}
	}
	return (
		<Container maxWidth="xs">
			<FormProvider
				initialValues={initialValues}
				onSubmit={onSubmit}
				buttonText="Sign In"
			/>
		</Container>
	)
}

export default LoginPage
