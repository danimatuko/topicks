import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./stores/RootStore";
import ScrollToTop from "./helpers/ScrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap2.min.css";
// import "./custom.scss";
import "./App.css";

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
