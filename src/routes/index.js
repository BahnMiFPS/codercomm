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
				index: true,
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
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
])

function Router() {
	return <RouterProvider router={router} />
}

export default Router
