import posts from "../models/posts.js";
import { statusCode } from "../config/constant.js";

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await posts.findByIdAndDelete(id);
    if (post) {
      return res.status(statusCode.OK).json({
        message: "Posts deleted successfully",
        data: post,
      });
    } else {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Post not found",
      });
    }
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Post deletion failed",
      error: error.message,
    });
  }
};