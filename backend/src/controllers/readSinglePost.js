import posts from "../models/posts.js";
import { statusCode } from "../config/constant.js";

export const getSinglePost = async (req, res) => {
    try {
        const _id = req.params.id;
         const post = await posts.findOne({_id:_id,
            authorId: req.userId,
         });
        if(post)
        {

            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                success:true,
                message:"Post fetched successfully",
                data: post,
            });
        }
        else res.status(statusCode.NOT_FOUND).json({
            success:false,
            message:"Post not found"
        })
    } catch (error) {

        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "Post fetching failed",
            error: error.message,
        });
    }
};