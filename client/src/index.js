import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./stores/RootStore";
import ScrollToTop from "./helpers/ScrollToTop";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ScrollToTop />
			<StoreProvider>
				<App />
			</StoreProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
