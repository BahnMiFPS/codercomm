import React, { useEffect } from "react"
import { Card, Container } from "@mui/material"
import Profile from "../features/user/Profile"
import ProfileCover from "../features/user/ProfileCover"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { getUser } from "../features/user/userSlice"
import LoadingScreen from "../components/LoadingScreen"
import useAuth from "../hooks/useAuth"
import { replace } from "lodash"

function UserProfilePage() {
	const { user } = useAuth()
	const currentUserId = user._id

	const params = useParams()
	const userId = params.userId
	const dispatch = useDispatch()
	const navigate = useNavigate()
	if (currentUserId === userId) {
		navigate("/", { replace: true })
	}
	const { selectedUser, isLoading } = useSelector(
		(state) => state.user,
		shallowEqual
	)

	useEffect(() => {
		if (userId) {
			dispatch(getUser(userId))
		}
	}, [dispatch, userId])

	return (
		<Container>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<>
					<Card
						sx={{
							mb: 3,
							height: 280,
							position: "relative",
						}}
					>
						{selectedUser && <ProfileCover profile={selectedUser} />}
					</Card>
					{selectedUser && <Profile profile={selectedUser} />}
				</>
			)}
		</Container>
	)
}

export default UserProfilePage
