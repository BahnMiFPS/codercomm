import { react, createContext, useEffect, useReducer, useState } from "react"
import apiService from "../app/apiService"
import { isValidToken } from "../utils/jwt"
import { useSelector } from "react-redux"

const initialState = {
	isInitialized: false,
	isAuthenticated: false,
	user: null,
}
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS"
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS"
const LOGOUT = "AUTH.LOGOUT"
const INITIALIZE = "AUTH.INITIALIZE"
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE"
const reducer = (state, action) => {
	switch (action.type) {
		case INITIALIZE:
			const { isAuthenticated, user } = action.payload
			return {
				...state,
				isInitialized: true,
				isAuthenticated,
				user: user,
			}
		case LOGIN_SUCCESS:
			console.log("login_success", action.payload.user)
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
		case UPDATE_PROFILE:
			const {
				name,
				avatarUrl,
				coverUrl,
				aboutMe,
				city,
				country,
				company,
				jobTitle,
				facebookLink,
				instagramLink,
				linkedinLink,
				twitterLink,
				friendCount,
				postCount,
			} = action.payload
			return {
				...state,
				user: {
					...state.user,
					name,
					avatarUrl,
					coverUrl,
					aboutMe,
					city,
					country,
					company,
					jobTitle,
					facebookLink,
					instagramLink,
					linkedinLink,
					twitterLink,
					friendCount,
					postCount,
				},
			}

		default:
			return state
	}
}

function setSession(accessToken) {
	if (accessToken) {
		window.localStorage.setItem("accessToken", accessToken)
		apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`
	} else {
		window.localStorage.removeItem("accessToken")
		delete apiService.defaults.headers.common.Authorization
	}
}
const AuthContext = createContext({ ...initialState })

function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const updatedProfile = useSelector((state) => state.user.updatedProfile)

	useEffect(() => {
		const initialize = async () => {
			try {
				const accessToken = window.localStorage.getItem("accessToken")

				if (accessToken && isValidToken(accessToken)) {
					setSession(accessToken)

					const response = await apiService.get("/users/me")
					const user = response.data.data
					console.log("initialize", user)
					dispatch({
						type: INITIALIZE,
						payload: { isAuthenticated: true, user },
					})
				} else {
					setSession(null)

					dispatch({
						type: INITIALIZE,
						payload: { isAuthenticated: false, user: null },
					})
				}
			} catch (err) {
				setSession(null)
				dispatch({
					type: INITIALIZE,
					payload: {
						isAuthenticated: false,
						user: null,
					},
				})
			}
		}

		initialize()
	}, [])
	useEffect(() => {
		if (updatedProfile)
			dispatch({ type: UPDATE_PROFILE, payload: updatedProfile })
	}, [updatedProfile])
	const login = async ({ email, password }, callback) => {
		const response = await apiService.post("/auth/login", { email, password })
		const { user, accessToken } = response.data.data

		setSession(accessToken)
		dispatch({
			type: LOGIN_SUCCESS,
			payload: { user },
		})
	}

	const register = async ({ name, email, password }, callback) => {
		const response = await apiService.post("/users", { name, email, password })
		const { user, accessToken } = response.data.data
		setSession(accessToken)

		dispatch({
			type: REGISTER_SUCCESS,
			payload: { user },
		})

		callback()
	}

	const logout = (callback) => {
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
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
export { AuthContext, AuthProvider }
