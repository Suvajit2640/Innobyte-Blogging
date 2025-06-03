import express from "express";
import { createPost } from "../controllers/createPost.js";
import { deletePost } from "../controllers/deletePost.js";
import { getAllPost } from "../controllers/readPosts.js";
import { updatePost } from "../controllers/UpdatePost.js";
import { getSinglePost } from "../controllers/readSinglePost.js";
import { postValidation } from "../validators/dataValidation.js";
import { validate } from "../middleware/validate.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const postRoute = express.Router();

postRoute.post("/",validate(postValidation),authMiddleware,isLoggedIn ,createPost);
postRoute.delete("/:id",authMiddleware,isLoggedIn , deletePost);
postRoute.get("/",authMiddleware,isLoggedIn , getAllPost);
postRoute.put("/:id", validate(postValidation),authMiddleware,isLoggedIn ,updatePost);
postRoute.get("/:id",authMiddleware,isLoggedIn , getSinglePost);

export default postRoute;