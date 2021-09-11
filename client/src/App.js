import { Route, Switch } from "react-router";
import CreatePost from "./components/CreatePost";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import PostPage from "./components/PostPage";

const App = () => {
	return (
		<div className="App">
			<Navigation />
			<main style={{ minHeight: "85vh" }}>
				<Switch>
					<Route exact path={["/", "/home"]} component={HomePage} />
					<Route exact path="/post" component={CreatePost} />
					<Route exact path="/posts/:id" component={PostPage} />
				</Switch>
			</main>
			<Footer />
		</div>
	);
};

export default App;
