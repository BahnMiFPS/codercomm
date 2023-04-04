import { Container } from "@mui/material"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import FormProvider from "../components/form/FormProvider"
import useAuth from "../hooks/useAuth"

const initialValues = {
	name: "",
	email: "",
	password: "",
	passwordConfirmation: "",
	remember: true,
}
function RegisterPage() {
	let navigate = useNavigate()

	const auth = useAuth()

	const onSubmit = async (values, { setErrors, setSubmitting }) => {
		let { name, email, password } = values

		try {
			await auth.register({ name, email, password }, () => {
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
				buttonText="Register"
			/>
		</Container>
	)
}

export default RegisterPage
