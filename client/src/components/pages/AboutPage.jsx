import React from "react";
import { Container } from "react-bootstrap";

const AboutPage = () => (
	<Container>
		<h1 className="display-5 mt-5 mb-4">About</h1>
		<p className="lead">
			Topicks is a blog ,created to read and share articles about variety of topics.
		</p>
		<p>I have developed this web application to extend my portfolio.</p>
		<p>
			The two main goals which were important to me was:
			<ul style={{ listStyle: "inside" }}>
				<li>
					Implement a rich text editor for a change, instaed of using a regular textarea
					to publish a post.
				</li>
				<li>
					After a few projects which I have worked with Redux, I wanted to try MobX for
					state mangement.
				</li>
			</ul>
		</p>
		<h2 className="h5">Main Technologies: </h2>
		<ul style={{ listStyle: "inside" }}>
			<li>React</li>
			<li>Mobx</li>
			<li>Boostrap</li>
			<li>NodeJs</li>
			<li>Express</li>
		</ul>
		<p>
			<span> View the soruce code in the</span>
			<a
				href="https://github.com/danimatuko/topicks.git"
				target="_blank"
				rel="noreferrer"
				className="text-dark ms-1"
			>
				Github repository here.
			</a>
		</p>
	</Container>
);

export default AboutPage;
