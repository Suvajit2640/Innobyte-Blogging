import posts from "../models/posts.js";
import { statusCode } from "../config/constant.js";

export const getAllPost = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const sortCriteria = {
            [req.query.sortField]: req.query.sortOrder === "asc" ? 1 : -1,
        };

        const offset = (page - 1) * limit;

        const posts = await posts
            .find({
                userId: req.userId,
                title: { $regex: req.body.title, $options: "i" },
            })
            .skip(offset)
            .limit(limit)
            .sort(sortCriteria)
            .exec();

        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "Posts fetched",
            data: posts,
            total: await posts.find({ userId: req.userId }).countDocuments(),
        });
    } catch (error) {

        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "Posts fetching failed",
            error: error.message,
        });
    }
};