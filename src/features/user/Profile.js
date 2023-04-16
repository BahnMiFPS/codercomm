import React from "react"
import useAuth from "../../hooks/useAuth"
import { Grid, Stack } from "@mui/material"
import ProfileScorecard from "./ProfileScorecard"
import ProfileAbout from "./ProfileAbout"
import ProfileSocialInfo from "./ProfileSocialInfo"
import PostForm from "../post/PostForm"
import PostList from "../post/PostList"

function Profile({ profile }) {
	const { user } = useAuth()
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={4}>
				<Stack spacing={3}>
					<ProfileScorecard profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileSocialInfo profile={profile} />
				</Stack>
			</Grid>
			<Grid item xs={12} md={8}>
				<Stack spacing={3}>
					{user._id === profile._id && <PostForm />}

					<PostList userID={profile._id} />
				</Stack>
			</Grid>
		</Grid>
	)
}

export default Profile
