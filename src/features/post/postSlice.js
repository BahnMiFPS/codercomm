import { createSlice } from "@reduxjs/toolkit"
import apiService from "../../app/apiService"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { POST_PER_PAGE } from "../../app/config"
import { toast } from "react-toastify"
import { cloudinaryUpload } from "../../utils/cloudinary"

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

		editPostSuccess(state, action) {
			state.isLoading = false
			state.error = null
			const newPostId = action.payload.data._id
			const newContent = action.payload.data.content
			const newImage = action.payload.data.image

			state.postsByID[newPostId] = {
				...state.postsByID[newPostId],
				content: newContent,
				image: newImage,
			}
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
		deletePostSuccess(state, action) {
			state.isLoading = false
			state.error = null
			const postIdToDelete = action.payload.data._id
			delete state.postsByID[postIdToDelete]
			state.currentPagePosts = state.currentPagePosts.filter(
				(postId) => postId !== postIdToDelete
			)
		},
		sendPostReactionSuccess(state, action) {
			state.isLoading = false
			state.error = null
			const { postId, reactions } = action.payload
			state.postsByID[postId].reactions = reactions
		},

		resetPosts(state, action) {
			state.postsByID = {}
			state.currentPagePosts = []
		},
	},
})

export const createPost =
	({ content, image }) =>
	async (dispatch) => {
		dispatch(slice.actions.startLoading())
		try {
			const imageUrl = await cloudinaryUpload(image)
			const response = await apiService.post("/posts", {
				content,
				image: imageUrl,
			})
			dispatch(slice.actions.createPostSuccess(response.data))
			toast.success("Create Post Successfully!")
		} catch (error) {
			dispatch(slice.actions.hasErrors(error.message))
			toast.error(error.message)
		}
	}

export const editPost = (data, postId) => async (dispatch) => {
	dispatch(slice.actions.startLoading())
	try {
		const content = data.content
		const image = data.image
		console.log(content, image, "from editPost")
		const imageUrl = await cloudinaryUpload(data.image)
		const response = await apiService.put(`/posts/${postId}`, {
			content: content,
			image: imageUrl,
		})
		dispatch(slice.actions.editPostSuccess(response.data))
		toast.success("Edit Post Successfully!")
	} catch (error) {
		dispatch(slice.actions.hasErrors(error.message))
		toast.error(error.message)
	}
}

export const deletePost = (postId) => async (dispatch) => {
	dispatch(slice.actions.startLoading())
	try {
		const response = await apiService.delete(`/posts/${postId}`)
		dispatch(slice.actions.deletePostSuccess(response.data))
		toast.success("Delete Post Successfully!")
	} catch (error) {
		dispatch(slice.actions.hasErrors(error.message))
		toast.error(error.message)
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
			if (page === 1) dispatch(slice.actions.resetPosts())
			dispatch(slice.actions.getPostSuccess(response.data.data))
		} catch (error) {
			dispatch(slice.actions.hasErrors(error.message))
			toast.error(error.message)
		}
	}

export const sendPostReaction =
	({ postId, emoji }) =>
	async (dispatch) => {
		dispatch(slice.actions.startLoading())
		try {
			const response = await apiService.post(`/reactions`, {
				targetType: "Post",
				targetId: postId,
				emoji: emoji,
			})
			dispatch(
				slice.actions.sendPostReactionSuccess({
					postId,
					reactions: response.data.data,
				})
			)
		} catch (error) {
			dispatch(slice.actions.hasErrors(error.message))
			toast.error(error.message)
		}
	}

export default slice.reducer
