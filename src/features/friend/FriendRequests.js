import React, { useEffect, useState } from "react"
import {
	Stack,
	Typography,
	Card,
	Box,
	Pagination,
	Grid,
	Container,
	Tabs,
	Tab,
	styled,
} from "@mui/material"

import IncomingFriendRequest from "./IncomingFriendRequest"
import OutgoingFriendRequest from "./OutgoingFriendRequests"
import { AccountBox, PeopleAlt } from "@mui/icons-material"
import { capitalCase } from "change-case"

function FriendRequests() {
	const REQUEST_TABS = [
		{
			value: "Incoming",
			icon: <AccountBox sx={{ fontSize: 24 }} />,
			component: <IncomingFriendRequest />,
		},
		{
			value: "Outgoing",
			icon: <PeopleAlt sx={{ fontSize: 24 }} />,
			component: <OutgoingFriendRequest />,
		},
	]

	const TabsWrapperStyle = styled("div")(({ theme }) => ({
		zIndex: 9,
		width: "100%",
		display: "flex",
		[theme.breakpoints.up("sm")]: {
			justifyContent: "flex-start",
		},
		[theme.breakpoints.up("md")]: {
			paddingRight: theme.spacing(3),
		},
		marginBottom: "1rem",
	}))
	const [currentTab, setCurrentTab] = useState("Incoming")
	const handleChangeTab = (newValue) => {
		setCurrentTab(newValue)
	}
	return (
		<Box sx={{ pb: 3 }}>
			<Typography variant="h4" sx={{ mb: 3 }}>
				Friend Requests
			</Typography>
			<TabsWrapperStyle>
				<Tabs
					value={currentTab}
					scrollButtons="auto"
					variant="scrollable"
					allowScrollButtonsMobile
					onChange={(e, value) => handleChangeTab(value)}
				>
					{REQUEST_TABS.map((tab) => (
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
			{REQUEST_TABS.map((tab) => {
				const isMatched = tab.value === currentTab
				return isMatched && <Box key={tab.value}>{tab.component}</Box>
			})}
		</Box>
	)
}

export default FriendRequests
