import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import BlankLayout from "../layouts/BlankLayout"
import MainLayout from "../layouts/MainLayout"
import AccountPage from "../pages/AccountPage"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import NotFoundPage from "../pages/NotFoundPage"
import RegisterPage from "../pages/RegisterPage"
import UserProfilePage from "../pages/UserProfilePage"
import AuthRequire from "./AuthRequire"

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<AuthRequire>
				<MainLayout />
			</AuthRequire>
		),
		children: [
			{
				path: "",
				element: <HomePage />,
			},
			{
				path: "account",
				element: <AccountPage />,
			},
			{
				path: "user/:userId",
				element: <UserProfilePage />,
			},
		],
	},

	{
		element: <BlankLayout />,
		children: [
			{
				path: "*",
				element: <NotFoundPage />,
			},
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
		],
	},
])

function Router() {
	return <RouterProvider router={router} />
}

export default Router
