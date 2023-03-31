import { createTheme } from "@mui/material/styles"

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#FFA500",
		},
		secondary: {
			main: "#008CBA",
		},
		background: {
			default: "#121212",
			paper: "#1e1e1e",
		},
		text: {
			primary: "#FFFFFF",
			secondary: "#a0a0a0",
		},
	},
	typography: {
		fontFamily: "'Montserrat', sans-serif",
		h1: {
			fontSize: "3rem",
			fontWeight: 600,
			lineHeight: 1.2,
			letterSpacing: "-0.01562em",
		},
		h2: {
			fontSize: "2.5rem",
			fontWeight: 500,
			lineHeight: 1.2,
			letterSpacing: "-0.00833em",
		},
		h3: {
			fontSize: "2rem",
			fontWeight: 400,
			lineHeight: 1.2,
			letterSpacing: "0em",
		},
		h4: {
			fontSize: "1.5rem",
			fontWeight: 400,
			lineHeight: 1.2,
			letterSpacing: "0.00735em",
		},
		h5: {
			fontSize: "1.25rem",
			fontWeight: 400,
			lineHeight: 1.2,
			letterSpacing: "0em",
		},
		h6: {
			fontSize: "1rem",
			fontWeight: 400,
			lineHeight: 1.2,
			letterSpacing: "0.0075em",
		},
		body1: {
			fontSize: "1rem",
			fontWeight: 400,
			lineHeight: 1.5,
			letterSpacing: "0.00938em",
		},
		button: {
			textTransform: "none",
			fontWeight: 700,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				contained: {
					backgroundColor: "#FFA500",
					color: "#FFFFFF",
					"&:hover": {
						backgroundColor: "#FFC107",
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: "#FFFFFF",
					"&:hover": {
						backgroundColor: "#FFA500",
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: "#121212",
				},
				MuiAlert: {
					styleOverrides: {
						root: {
							backgroundColor: "#FFA500",
							color: "#FFFFFF",
						},
					},
				},
			},
		},
	},
})

export default theme
