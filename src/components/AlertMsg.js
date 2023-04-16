import React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

const AlertMsg = () => {
	return (
		<ToastContainer
			position="top-right"
			hideProgressBar={false}
			newestOnTop={false}
			pauseOnHover
			theme="dark"
		/>
	)
}

export default AlertMsg
