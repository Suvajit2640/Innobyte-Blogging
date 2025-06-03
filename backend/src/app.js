import express from "express";
import { config } from "dotenv";
import dbconnect from "./config/dbconnection.js";
import postRoute from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/posts", postRoute);
app.use("/",userRoutes);

dbconnect();

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});