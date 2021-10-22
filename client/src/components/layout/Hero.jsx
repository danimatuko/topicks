import { Button, Container } from "react-bootstrap";
import React, { useContext } from "react";
import { StoreContext } from "../../stores/RootStore";
import { useHistory } from "react-router";

const Hero = () => {
	const { user } = useContext(StoreContext);
	const history = useHistory();

	const onclick = () => {
		user.isAuth ? history.push("/post") : history.push("/login");
	};
	return (
		<div className="hero bg-primary">
			<Container>
				<h1 className="display-1 text-dark text-center">TOPICKS</h1>
				<p className="lead text-light text-center">
					Write, share and discuss about hot topics
				</p>
				<Button
					className="d-block m-auto fs-4 fw-light px-4  py-2 mt-4"
					variant="secondary"
					onClick={onclick}
				>
					Post Now
				</Button>
			</Container>
		</div>
	);
};

export default Hero;
