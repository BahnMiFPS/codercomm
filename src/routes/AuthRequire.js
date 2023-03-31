import { replace } from "lodash"
import React from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function AuthRequire({ children }) {
	const { isInitialized, isAuthenticated } = useAuth()
	const location = useLocation()

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />
	}

	return children
}

export default AuthRequire
