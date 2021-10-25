import { Route, Switch } from "react-router";
import CreatePost from "./components/CreatePost";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/layout/Footer";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/layout/Navigation";
import PostPage from "./components/PostPage";
import SignUpForm from "./components/SignUpForm";
import ProtectedRoute from "./components/layout/ProtecedRoute";
import ForbiddenPage from "./components/error-page/ForbiddenPage";
import PageNotFound from "./components/error-page/PageNotFound";
import AllPosts from "./components/AllPosts";
import SearchResults from "./components/SearchResults";
import { useContext } from "react";
import { StoreContext } from "./stores/RootStore";
import { observer } from "mobx-react-lite";

const App = observer(() => {
	const { user } = useContext(StoreContext);

	return (
		<div className="App">
			<Navigation />
			<main style={{ minHeight: "72.5vh" }}>
				<Switch>
					<Route exact path="/sign-in" component={SignUpForm} />
					<Route exact path="/login" component={LoginForm} />
					<ProtectedRoute
						isAuth={user.isAuth}
						exact
						path="/dashboard"
						component={Dashboard}
					/>
					<ProtectedRoute
						isAuth={user.isAuth}
						exact
						path={["/post", `/post/edit/:id`]}
						component={CreatePost}
					/>
					<Route exact path="/posts/:id" component={PostPage} />
					<Route exact path="/posts" component={AllPosts} />
					<Route exact path="/search" component={SearchResults} />
					{
						// add regex to match this route/posts/?page=2
					}
					<Route exact path={["/", "/home", "/posts/"]} component={HomePage} />
					<Route exact path="/forbbiden" component={ForbiddenPage} />
					<Route exact path="*" component={PageNotFound} />
				</Switch>
			</main>
			<Footer />
		</div>
	);
});

export default App;
