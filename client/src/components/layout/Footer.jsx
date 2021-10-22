import React from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="text-center py-4" style={{ backgroundColor: "#e7e7e794" }}>
			<Container className="d-flex justify-content-between align-items-center">
				<Link to="/">
					<Image src="/logo/Topicks-logos_black.png" alt="logo" width="85px" />
				</Link>
				<div>
					<p className="text-secondary fw-bold mb-1">© 2021 Dani Matuko</p>
					<a
						href="https://dani-matuko.com/"
						target="_blank"
						rel="noreferrer"
						className="text-secondary mt-1"
					>
						dani-matuko.com
					</a>
				</div>
				<div>
					<div className="d-flex flex-column justify-content-center align-items-center">
						<h2 className="h6 text-center text-secondary">Get in touch</h2>
						<ul className="d-flex justify-content-evenly align-items p-0 mb-0">
							<li>
								<a
									target="_blank"
									rel="noreferrer"
									href="https://www.linkedin.com/in/dani-matuko/"
									className="text-secondary"
								>
									<i className="fs-4 fab fa-linkedin"></i>
								</a>
							</li>
							<li>
								<a
									target="_blank"
									rel="noreferrer"
									href="https://github.com/danimatuko"
									className="text-secondary"
								>
									<i className="fs-4 fab fa-github"></i>
								</a>
							</li>
							<li>
								<a
									target="_blank"
									rel="noreferrer"
									href="mailto:matuko305@gmail.com"
									className="text-secondary"
								>
									<i className="fs-4 far fa-envelope"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
