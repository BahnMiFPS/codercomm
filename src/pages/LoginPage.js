import { Container } from "@mui/material"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import FormProvider from "../components/form/FormProvider"
import useAuth from "../hooks/useAuth"

function LoginPage() {
	let location = useLocation()
	let navigate = useNavigate()

	let auth = useAuth()
	const initialValues = {
		email: "",
		password: "",
		remember: true,
	}

	const onSubmit = async (values, { setErrors, setSubmitting }) => {
		const from = location.state?.from?.pathname || "/"
		let { email, password } = values

		try {
			await auth.login({ email, password }, () => {
				navigate("/", { replace: true })
			})
		} catch (error) {
			setErrors({ responseError: error.message })
		} finally {
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
