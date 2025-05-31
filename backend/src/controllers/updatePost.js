import posts from "../models/posts.js";
import { statusCode } from "../config/constant.js";

export const updatePost = async (req, res) => {
    try {
        const _id = req.params.id;
        const { title, content } = req.body;

        const existing = await posts.findOne({
            title: title,
            userId: req.userId,
            _id: { $ne: _id },
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "This title Already Exists",
            });
        }

        const updated_result = await posts.findByIdAndUpdate(
            { _id },
            {
                title: title,
                content: content,
                updatedAt: Date.now(),
            },
            { new: true }
        );
        if (updated_result) {
            return res.status(statusCode.OK).json({
                success: true,
                data: updated_result,
                message: "Post updated successfully.",
            });
        } else {
            return res.status(statusCode.NOT_FOUND).json({
                success:true,
                message: "Post not found",
            });
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};