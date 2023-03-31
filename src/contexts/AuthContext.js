import { react, createContext, useEffect, useReducer, useState } from "react"
import apiService from "../app/apiService"
import { isValidToken } from "../utils/jwt"

const initialState = {
	isInitialized: false,
	isAuthenticated: false,
	user: null,
}
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS"
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS"
const LOGOUT = "AUTH.LOGOUT"
const INITIALIZED = "AUTH.INITIALIZED"

function setSession(accessToken) {
	if (accessToken) {
		window.localStorage.setItem("accessToken", accessToken)
		apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`
	} else {
		window.localStorage.removeItem("accessToken")
		delete apiService.defaults.headers.common.Authorization
	}
}
const reducer = (state, action) => {
	switch (action.type) {
		case INITIALIZED:
			const { isAuthenticated, user } = action.payload
			return {
				...state,
				isInitialized: true,
				isAuthenticated,
				user,
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
			}
		case REGISTER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
			}

		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: null,
			}
		default:
			return state
	}
}
const AuthContext = createContext({ ...initialState })

function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		async function init() {
			try {
				const accessToken = window.localStorage.getItem("accessToken")

				if (accessToken && isValidToken(accessToken)) {
					setSession(accessToken)

					const response = await apiService.get("/users/me")
					const user = response.data

					dispatch({
						type: INITIALIZED,
						payload: { isAuthenticated: true, user },
					})
				} else {
					setSession(null)

					dispatch({
						type: INITIALIZED,
						payload: { isAuthenticated: false, user: null },
					})
				}
			} catch (error) {
				console.log(error)

				setSession(null)
				dispatch({
					type: INITIALIZED,
					payload: { isAuthenticated: false, user: null },
				})
			}
		}

		init()
	}, [])

	const login = async ({ email, password }, callback) => {
		const response = await apiService.post("/auth/login", { email, password })
		const { user, accessToken } = response.data

		setSession(accessToken)
		dispatch({
			type: LOGIN_SUCCESS,
			payload: { user },
		})

		callback()
	}

	const register = async ({ name, email, password }, callback) => {
		const response = await apiService.post("/users", { name, email, password })
		const { user, accessToken } = response.data
		setSession(accessToken)

		dispatch({
			type: REGISTER_SUCCESS,
			payload: { user },
		})

		callback()
	}

	const logout = async (callback) => {
		setSession(null)

		dispatch({
			type: LOGOUT,
		})

		callback()
	}
	return (
		<AuthContext.Provider
			value={{
				...state,
				login,
				logout,
				register,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
export { AuthContext, AuthProvider }
