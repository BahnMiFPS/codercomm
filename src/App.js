import React from "react"

import Router from "./routes"
import ThemeProvider from "./themes"

function App() {
	return (
		<>
			<ThemeProvider>
				<Router />
			</ThemeProvider>
		</>
	)
}

export default App
