import express from "express";
import "express-async-errors";
import connectToDB from "./database/db.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
dotenv.config();
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

connectToDB();

app.use(express.json());
//routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/post/:id/comments", commentRoutes);

const __dirname = path.resolve(); // __dirname is not defined in ES6 module scope

if (process.env.NODE_ENV === "production") {
	// Express will serve up production assets
	app.use(express.static(path.join(__dirname, "/client/build")));
	// Express will serve up index.html file if it doesn't recognize the route
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
}

//error middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`);
});
