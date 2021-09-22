import { Route, Switch } from "react-router";
import CreatePost from "./components/CreatePost";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import PostPage from "./components/PostPage";
import SignUpForm from "./components/SignUpForm";

const App = () => {
	return (
		<div className="App">
			<Navigation />
			<main style={{ minHeight: "80vh" }}>
				<Switch>
					<Route exact path="/sign-in" component={SignUpForm} />
					<Route exact path="/login" component={LoginForm} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path={["/", "/home"]} component={HomePage} />
					<Route exact path={["/post",`/post/edit/:id`]} component={CreatePost} />
					<Route exact path="/posts/:id" component={PostPage} />
				</Switch>
			</main>
			<Footer />
		</div>
	);
};

export default App;
