import posts from "../models/posts.js";
import { statusCode } from "../config/constant.js";

export const createPost = async (req, res) => {
    try {
        // const userId = req.userId;
        const { title, content,userId } = req.body;

        const existing = await posts.findOne({
            title: req.body.title,
            userId: req.userId,
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "This title Already Exists",
            });
        }

        const note = await posts.create({
            title,
            content,
            authorId: userId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        if (note) {
            return res.status(statusCode.CREATED).json({
                success: true,
                data: note,
                message: "Post created successfully",
            });
        } else {
            console.log("Post cannot be created");
        }
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};