import { createSlice } from "@reduxjs/toolkit"
import apiService from "../../app/apiService"
import { useParams } from "react-router-dom"

const initialState = {
	isLoading: false,
	error: null,
	posts: [],
}

const slice = createSlice({
	name: "post",
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true
		},
		hasErrors(state, action) {
			state.isLoading = false
			state.error = action.payload
		},
		createPostSuccess(state, action) {
			state.isLoading = false
			state.error = null
		},
		getPostSuccess(state, action) {
			state.isLoading = false
			state.error = null
			state.posts = action.payload.data.posts
		},
	},
})

export const createPost =
	({ content, image }) =>
	async (dispatch) => {
		dispatch(slice.actions.startLoading())
		try {
			const response = await apiService.post("/posts", { content, image })
			dispatch(slice.actions.createPostSuccess(response.data))
		} catch (error) {
			dispatch(slice.actions.hasErrors(error.message))
		}
	}

export const getPost =
	({ userID, page, limit = 2 }) =>
	async (dispatch) => {
		dispatch(slice.actions.startLoading())
		try {
			const params = { page, limit }

			const response = await apiService.get(`/posts/user/${userID}`, {
				params,
			})
			dispatch(slice.actions.getPostSuccess(response.data))
		} catch (error) {
			dispatch(slice.actions.hasErrors(error.message))
		}
	}

export default slice.reducer
