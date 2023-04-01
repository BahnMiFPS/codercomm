import { CssBaseline, ThemeProvider } from "@mui/material"
import React from "react"

import Router from "./routes"
import theme from "./themes/theme"

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router />
			</ThemeProvider>
		</>
	)
}

export default App
