import React, { useEffect, useState } from "react"
import {
	Stack,
	Typography,
	Card,
	Box,
	Pagination,
	Grid,
	Container,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getIncomingFriendRequests } from "./friendSlice"
import UserCard from "./UserCard"
import SearchInput from "../../components/SearchInput"
import IncomingFriendRequest from "./IncomingFriendRequest"
import OutgoingFriendRequest from "./OutgoingFriendRequests"

function FriendRequests() {
	return (
		<>
			<Typography variant="h4" sx={{ mb: 3 }}>
				Friend Requests
			</Typography>
			<IncomingFriendRequest />
			<OutgoingFriendRequest />
		</>
	)
}

export default FriendRequests
