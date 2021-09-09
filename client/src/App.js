import { Route, Switch } from "react-router";
import CreatePost from "./components/CreatePost";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";

const App = () => {
	// move tinymce apiKey to .env
	return (
		<div className="App">
			<Navigation />
			<Switch>
				<Route exact path={["/", "/home"]} component={HomePage} />
				<Route exact path="/post" component={CreatePost} />
			</Switch>
		</div>
	);
};

export default App;
