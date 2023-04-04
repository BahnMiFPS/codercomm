import { combineReducers, configureStore } from "@reduxjs/toolkit"

const rootReducer = {
	// post: postReducer,
	// user: userReducer,
	// comment: commentReducer,
	// friend: friendReducer,
}
export const store = configureStore({
	reducer: rootReducer,
})
