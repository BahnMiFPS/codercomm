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
import { capitalCase } from "change-case"

import { Box, Card, Container, Tab, Tabs, styled } from "@mui/material"
import ProfileCover from "../features/user/ProfileCover"
function HomePage() {
	const { user } = useAuth()

	const [currentTab, setCurrentTab] = useState("profile")
	const handleChangeTab = (newValue) => {
		setCurrentTab(newValue)
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

	const TabsWrapperStyle = styled("div")(({ theme }) => ({
		zIndex: 9,
		bottom: 0,
		width: "100%",
		display: "flex",
		position: "absolute",
		[theme.breakpoints.up("sm")]: {
			justifyContent: "center",
		},
		[theme.breakpoints.up("md")]: {
			justifyContent: "flex-end",
			paddingRight: theme.spacing(3),
		},
	}))
	return (
		<Container>
			<Card
				sx={{
					mb: 3,
					height: 280,
					position: "relative",
				}}
			>
				<ProfileCover profile={user} />

				<TabsWrapperStyle>
					<Tabs
						value={currentTab}
						scrollButtons="auto"
						variant="scrollable"
						allowScrollButtonsMobile
						onChange={(e, value) => handleChangeTab(value)}
					>
						{PROFILE_TABS.map((tab) => (
							<Tab
								disableRipple
								key={tab.value}
								value={tab.value}
								icon={tab.icon}
								label={capitalCase(tab.value)}
							/>
						))}
					</Tabs>
				</TabsWrapperStyle>
			</Card>

			{PROFILE_TABS.map((tab) => {
				const isMatched = tab.value === currentTab
				return isMatched && <Box key={tab.value}>{tab.component}</Box>
			})}
		</Container>
	)
}

export default HomePage
