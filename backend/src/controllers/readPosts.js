import { statusCode } from "../config/constant.js";
import posts from "../models/posts.js";

export const getAllPost = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortField = req.query.sortField || "createdAt";
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
        const offset = (page - 1) * limit;

        const filter = {
            authorId: req.userId,
        };

        const allPosts = await posts
            .find(filter)
            .skip(offset)
            .limit(limit)
            .sort({ [sortField]: sortOrder })
            .exec();

        const total = await posts.countDocuments(filter);

        res.status(statusCode.OK).json({
            message: "Posts fetched",
            data: allPosts,
            total,
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "Posts fetching failed",
            error: error.message,
        });
    }
};
