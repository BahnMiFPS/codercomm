import { createSlice } from "@reduxjs/toolkit"
import apiService from "../../app/apiService"
import { toast } from "react-toastify"
import { cloudinaryUpload } from "../../utils/cloudinary"
// import { cloudinaryUpload } from "../../utils/cloudinary"

const initialState = {
	isLoading: false,
	error: null,
	selectedUser: null,
}

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true
		},

		hasErrors(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		getUsersSuccess(state, action) {
			state.isLoading = false
			state.error = null
			state.selectedUser = action.payload
		},
		updateUserProfileSuccess(state, action) {
			state.isLoading = false
			state.error = null

			const updatedUser = action.payload
			state.updatedProfile = updatedUser
		},
	},
})

export default slice.reducer

export const getUser = (userId) => async (dispatch) => {
	dispatch(slice.actions.startLoading())
	try {
		const response = await apiService.get(`/users/${userId}`)
		dispatch(slice.actions.getUsersSuccess(response.data.data))
	} catch (error) {
		dispatch(slice.actions.hasErrors(error.message))
		toast.error(error.message)
	}
}
export const updateUserProfile =
	({
		userId,
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
	}) =>
	async (dispatch) => {
		dispatch(slice.actions.startLoading())
		try {
			const data = {
				name,
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
			}
			if (avatarUrl instanceof File) {
				const imageUrl = await cloudinaryUpload(avatarUrl)
				data.avatarUrl = imageUrl
			}
			const response = await apiService.put(`/users/${userId}`, data)
			dispatch(slice.actions.updateUserProfileSuccess(response.data.data))
			toast.success("Update Profile successfully")
		} catch (error) {
			dispatch(slice.actions.hasErrors(error.message))
			toast.error(error.message)
		}
	}
