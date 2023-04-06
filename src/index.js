import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { AuthProvider } from "./contexts/AuthContext"
import { Provider } from "react-redux"
import store from "./app/store"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</Provider>
	</React.StrictMode>
)
