import { Box, CircularProgress } from "@mui/material"
import React from "react"

function LoadingScreen() {
	return (
		<Box
			sx={{
				height: "100vh",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
		</Box>
	)
}

export default LoadingScreen
