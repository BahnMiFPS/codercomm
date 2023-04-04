import {
	AccountBox,
	ContactMail,
	PeopleAlt,
	PersonAddRounded,
} from "@mui/icons-material"
import React, { useState } from "react"
import Profile from "../features/user/Profile"
import FriendList from "../features/friend/FriendList"
import FriendRequests from "../features/friend/FriendRequests"
import AddFriend from "../features/friend/AddFriend"
import useAuth from "../hooks/useAuth"
import {
	Avatar,
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Tab,
	Tabs,
	useTheme,
} from "@mui/material"
function HomePage() {
	const { user } = useAuth()
	console.log(user)

	const [activeTabs, setActiveTabs] = useState(0)
	const handleTabChange = (e, tab) => {
		setActiveTabs(tab)
	}
	const PROFILE_TABS = [
		{
			value: "profile",
			icon: <AccountBox sx={{ fontSize: 24 }} />,
			component: <Profile profile={user} />,
		},
		{
			value: "friends",
			icon: <PeopleAlt sx={{ fontSize: 24 }} />,
			component: <FriendList />,
		},
		{
			value: "requests",
			icon: <ContactMail sx={{ fontSize: 24 }} />,
			component: <FriendRequests />,
		},
		{
			value: "add_friend",
			icon: <PersonAddRounded sx={{ fontSize: 24 }} />,
			component: <AddFriend />,
		},
	]
	const theme = useTheme()

	const cardContainerStyle = {
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.down("xl")]: {
			backgroundColor: "red",
		},
	}

	const cardActionsStyle = {
		display: "flex",
		justifyContent: "flex-end",
		[theme.breakpoints.down("xl")]: {
			backgroundColor: "blue",
		},
	}
	return (
		<Container>
			<Card style={cardContainerStyle}>
				<Box position={"relative"}>
					<CardMedia
						component="img"
						alt="green iguana"
						height={"300px"}
						image="https://i.imgur.com/Zxlr4t1.png"
					/>
					<Box position={"absolute"}>
						<Avatar
							sx={{
								top: "-90px",
								left: "50px",
								width: "120px",
								height: "120px",
							}}
							alt="Remy Sharp"
							src={user?.avatarURL}
						/>
					</Box>
				</Box>

				<CardActions style={cardActionsStyle}>
					<Tabs value={activeTabs} onChange={handleTabChange}>
						{PROFILE_TABS.map((tab) => (
							<Tab
								label={tab.value}
								key={tab.value}
								icon={tab.icon}
								disableRipple
							/>
						))}
					</Tabs>
				</CardActions>
			</Card>
			{PROFILE_TABS[activeTabs]?.component}
		</Container>
	)
}

export default HomePage
