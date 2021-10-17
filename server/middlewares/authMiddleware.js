import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

			req.user = decodedToken;
			next();
		} catch (e) {
			res.status(400);
			throw new Error("Invalid token");
		}
	} else {
		return res.status(401).send("No token provided");
	}
};

export default auth;
