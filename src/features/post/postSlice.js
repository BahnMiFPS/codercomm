import { createSlice } from "@reduxjs/toolkit"
import apiService from "../../app/apiService"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { POST_PER_PAGE } from "../../app/config"

const initialState = {
	isLoading: false,
	error: null,
	postsByID: {},
	currentPagePosts: [],
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
			const newPost = action.payload.data
			if (state.currentPagePosts.length % POST_PER_PAGE === 0)
				state.currentPagePosts.pop()
			state.postsByID[newPost._id] = newPost
			state.currentPagePosts.unshift(newPost._id)
		},

		getPostSuccess(state, action) {
			state.isLoading = false
			state.error = null
			const { count, posts } = action.payload
			posts.forEach((post) => {
				state.postsByID[post._id] = post
				if (!state.currentPagePosts.includes(post._id)) {
					state.currentPagePosts.push(post._id)
				}
			})
			state.totalPosts = count
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
	({ userID, page, limit = POST_PER_PAGE }) =>
	async (dispatch) => {
		dispatch(slice.actions.startLoading())
		try {
			const params = { page, limit }

			const response = await apiService.get(`/posts/user/${userID}`, {
				params,
			})
			dispatch(slice.actions.getPostSuccess(response.data.data))
		} catch (error) {
			dispatch(slice.actions.hasErrors(error.message))
		}
	}

export default slice.reducer
