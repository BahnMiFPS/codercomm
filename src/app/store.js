import { combineReducers, configureStore } from "@reduxjs/toolkit"
import commentReducer from "../features/comment/commentSlice"
import friendReducer from "../features/friend/friendSlice"
import userReducer from "../features/user/userSlice"
import postReducer from "../features/post/postSlice"

const rootReducer = {
	post: postReducer,
	user: userReducer,
	comment: commentReducer,
	friend: friendReducer,
}

const store = configureStore({
	reducer: rootReducer,
})

export default store
