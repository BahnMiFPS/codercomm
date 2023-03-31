import { CssBaseline, ThemeProvider } from "@mui/material"
import React from "react"
import { AuthProvider } from "./contexts/AuthContext"

import Router from "./routes"
import theme from "./themes/theme"

function App() {
	return (
		<>
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Router />
				</ThemeProvider>
			</AuthProvider>
		</>
	)
}

export default App
