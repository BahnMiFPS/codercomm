import { Stack } from "@mui/material"
import React from "react"
import { Outlet } from "react-router-dom"
import Logo from "../components/Logo"

function BlankLayout() {
	return (
		<Stack
			sx={{
				minHeight: "100vh",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Logo sx={{ width: 90, height: 90, mb: 5 }} />
			<Outlet />
		</Stack>
	)
}

export default BlankLayout
