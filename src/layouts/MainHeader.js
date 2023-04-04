import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from "@mui/icons-material/AccountCircle"
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import useAuth from "../hooks/useAuth"
import Logo from "../components/Logo"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { Avatar, Divider, Link } from "@mui/material"

const disableButtonStyle = { pointerEvents: "none", cursor: "default" }

function MainHeader() {
	const { user, logout } = useAuth()
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const isMenuOpen = Boolean(anchorEl)
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}
	const handleLogout = async () => {
		try {
			handleMenuClose()
			await logout(() => {
				navigate("/login")
			})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Box sx={{ mb: 3 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="small"
						edge="start"
						color="inherit"
						aria-label="logo"
						sx={{
							mr: 2,
							"&:hover": {
								background: "none",
							},
						}}
						component={RouterLink}
						to={"/"}
					>
						<Logo />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						CoderComm
					</Typography>
					<Box>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
							sx={{
								"&:hover": {
									background: "none",
								},
							}}
						>
							<Avatar src={user?.avatarUrl} alt={user?.name} />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
						>
							<MenuItem style={disableButtonStyle}>
								<Typography variant="subtitle2" noWrap>
									{user?.name}
								</Typography>
							</MenuItem>
							<MenuItem style={disableButtonStyle}>
								<Typography variant="body2" noWrap>
									{user?.email}
								</Typography>
							</MenuItem>
							<Divider />
							<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
							<MenuItem
								onClick={handleMenuClose}
								component={RouterLink}
								to="/account"
							>
								My account
							</MenuItem>
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
export default MainHeader
