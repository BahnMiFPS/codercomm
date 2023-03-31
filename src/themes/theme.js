// src/theme.js

import { createTheme } from "@mui/material"

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#1DA1F2",
		},
		secondary: {
			main: "#8E8E8E",
		},
		background: {
			paper: "#15202B",
			default: "#0D1418",
		},
		text: {
			primary: "#D9D9D9",
			secondary: "#8E8E8E",
		},
	},
})

export default theme
