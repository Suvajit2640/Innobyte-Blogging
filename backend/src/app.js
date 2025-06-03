import express from "express";
import { config } from "dotenv";
import dbconnect from "./config/dbconnection.js";
import postRoute from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { swaggerUi, swaggerSpec } from "./docs/swagger.js";
import helmet from "helmet";

config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/login", apiLimiter);
app.use("/posts", postRoute);
app.use("/",userRoutes);
app.use(helmet());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

dbconnect();

export default app;
