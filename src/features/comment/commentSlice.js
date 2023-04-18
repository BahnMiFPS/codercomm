import { createSlice } from "@reduxjs/toolkit"
import apiService from "../../app/apiService"
import { COMMENTS_PER_POST } from "../../app/config"
import { toast } from "react-toastify"

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
		deleteCommentSuccess(state, action) {
			state.isLoading = false
			state.error = null
		},
		sendCommentReactionSuccess(state, action) {
			state.isLoading = false
			state.error = null
			const { commentId, reactions } = action.payload
			state.commentsById[commentId].reactions = reactions
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
			toast.error(error.message)
		}
	}
export const deleteComment = (commentId, postId) => async (dispatch) => {
	dispatch(slice.actions.startLoading())
	try {
		const response = await apiService.delete(`/comments/${commentId}`)
		dispatch(slice.actions.deleteCommentSuccess(response.data.data))
		dispatch(getComments({ postId }))
	} catch (error) {
		dispatch(slice.actions.hasErrors(error.message))
		toast.error(error.message)
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
			toast.error(error.message)
		}
	}

export const sendCommentReaction =
	({ commentId, emoji }) =>
	async (dispatch) => {
		try {
			const response = await apiService.post(`/reactions`, {
				targetType: "Comment",
				targetId: commentId,
				emoji: emoji,
			})
			dispatch(
				slice.actions.sendCommentReactionSuccess({
					commentId,
					reactions: response.data.data,
				})
			)
		} catch (error) {
			dispatch(slice.actions.hasErrors(error.message))
			toast.error(error.message)
		}
	}
export default slice.reducer
