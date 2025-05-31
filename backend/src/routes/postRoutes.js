import express from "express";
import { createPost } from "../controllers/createPost.js";
import { deletePost } from "../controllers/deletePost.js";
import { getAllPost } from "../controllers/readPosts.js";
import { updatePost } from "../controllers/UpdatePost.js";
import { getSinglePost } from "../controllers/readSinglePost.js";
import { postValidation } from "../validators/dataValidation.js";
import { validate } from "../middleware/validate.js";

const postRoute = express.Router();

postRoute.post("/",validate(postValidation), createPost);
postRoute.delete("/:id", deletePost);
postRoute.get("/", getAllPost);
postRoute.put("/:id", updatePost);
postRoute.get("/:id", getSinglePost);

export default postRoute;