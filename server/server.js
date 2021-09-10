import express from "express";
import connectToDB from "./database/db.js";
import postRoutes from "./routes/postRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;




connectToDB();

app.use(express.json());

app.use("/posts", postRoutes);

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`);
});
