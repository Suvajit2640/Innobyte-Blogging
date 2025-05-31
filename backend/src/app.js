import express from "express";
import { config } from "dotenv";
import dbconnect from "./config/dbconnection.js";
import postRoute from "./routes/postRoutes.js";

config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/posts", postRoute);

dbconnect();

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});