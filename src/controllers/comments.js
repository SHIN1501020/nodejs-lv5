import { asyncHandler } from "../middlewares/asyncHandler.js";
import { CommentsService } from "../services/comments.js"
import { Message } from "../constants/index.js";

export class CommentsController {
    commentsService = new CommentsService();

    createComment = asyncHandler(async(req, res, next)=>{
        const { postId } = req.params;
        const { userId } = req.user;
        const { comment } = req.body;

        await this.commentsService.createComment(postId, userId, comment);
        return res.status(201).json({ message: Message.COMMENT_CREATED });    
    });

    getComments = asyncHandler(async(req, res, next)=>{
        const { postId } = req.params;
        const comments = await this.commentsService.findComments(postId)
        return res.status(200).json({ comments: comments})
    });

    updateComment = asyncHandler(async(req, res, next)=>{
        const { postId, commentId } = req.params;
        const { userId } = req.user;
        const { comment } = req.body;

        await this.commentsService.updateComment(postId, commentId, userId, comment);
        return res.status(200).json({ message: Message.COMMENT_EDIT_SUCCESS });
    });

    deleteComment = asyncHandler(async(req, res, next)=>{
        const { postId, commentId } = req.params;
        const { userId } = req.user;

        await this.commentsService.deleteComment(postId, commentId, userId);
        return res.status(200).json({ message: Message.COMMENT_DELETE_SUCCESS });
    });
}   
