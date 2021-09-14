import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./stores/rootStore";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<StoreProvider>
				<App />
			</StoreProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
