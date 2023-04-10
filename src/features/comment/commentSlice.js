import { createSlice } from "@reduxjs/toolkit"
import apiService from "../../app/apiService"
import { COMMENTS_PER_POST } from "../../app/config"

const initialState = {
	isLoading: false,
	error: null,
	commentsById: {},
	commentsByPost: {},
	currentPageByPost: {},
	totalCommentsByPost: {},
}

const slice = createSlice({
	name: "comment",
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true
		},

		hasErrors(state, action) {
			state.isLoading = false
			state.error = action.payload
		},

		createCommentSuccess(state, action) {
			state.isLoading = false
			state.error = null
		},
		getCommentSuccess(state, action) {
			state.isLoading = false
			state.error = null
			const { postId, comments, count, page } = action.payload
			comments.forEach((comment) => {
				state.commentsById[comment._id] = comment
			})
			state.commentsByPost[postId] = comments
				.map((comment) => comment._id)
				.reverse()
			state.totalCommentsByPost[postId] = count
			state.currentPageByPost[postId] = page
		},
	},
})

export const createComment =
	({ postId, content }) =>
	async (dispatch) => {
		dispatch(slice.actions.startLoading())
		try {
			const response = await apiService.post("/comments", { postId, content })
			dispatch(slice.actions.createCommentSuccess(response.data.data))
			dispatch(getComments({ postId }))
		} catch (error) {
			dispatch(slice.actions.hasErrors(error.message))
		}
	}

export const getComments =
	({ postId, page = 1, limit = COMMENTS_PER_POST }) =>
	async (dispatch) => {
		dispatch(slice.actions.startLoading())
		try {
			const params = {
				page,
				limit,
			}
			const response = await apiService.get(`/posts/${postId}/comments`, {
				params,
			})
			dispatch(
				slice.actions.getCommentSuccess({ ...response.data.data, postId, page })
			)
		} catch (error) {
			dispatch(slice.actions.hasErrors(error.message))
		}
	}
export default slice.reducer
