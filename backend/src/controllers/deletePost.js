import posts from "../models/posts.js";
import { statusCode } from "../config/constant.js";

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await posts.findOneAndDelete({
      _id: id,
      authorId: req.userId, 
    });

    if (post) {
      return res.status(statusCode.OK).json({
        message: "Post deleted successfully",
        data: post,
      });
    } else {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Post not found or you are not the author",
      });
    }
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Post deletion failed",
      error: error.message,
    });
  }
};
