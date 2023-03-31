// src/theme.js
import { createTheme } from "@mui/material"

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#ff4444",
			contrastText: "#fff",
		},
		secondary: {
			main: "#fca311",
			contrastText: "#fff",
		},
		background: {
			default: "#121212",
			paper: "#1e1e1e",
		},
		text: {
			primary: "#fff",
			secondary: "#a0a0a0",
		},
	},
})

export default theme
