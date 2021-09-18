import jwt from "jsonwebtoken";

export const generateToken = (id, first_name, last_name, role) => {
	const token = jwt.sign({ id, first_name, last_name, role }, process.env.JWT_SECRET, {
		expiresIn: "1h"
	});
	return token;
};
