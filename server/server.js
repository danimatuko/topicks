import express from "express";
import "express-async-errors";
import connectToDB from "./database/db.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectToDB();

app.use(express.json());
//routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
//error middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`);
});
