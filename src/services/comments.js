import { CustomError } from "../utils/errors/CustomError.js";
import { Message } from "../constants/index.js";

export class CommentsService {
  constructor(commentsRepository, postsRepository){
    this.commentsRepository = commentsRepository;
    this.postsRepository = postsRepository;
  }

  createComment = async (postId, userId, comment) => {
    const post = await this.postsRepository.findPost(postId);
    if (!post) throw new CustomError(404, Message.POST_DOES_NOT_EXIST);

    return await this.commentsRepository.createComment(postId, userId, comment);
  };

  findComments = async (postId) => {
    const post = await this.postsRepository.findPost(postId);
    if (!post) throw new CustomError(404, Message.POST_DOES_NOT_EXIST);

    return await this.commentsRepository.findComments(postId);
  };

  updateComment = async (postId, commentId, userId, comment) => {
    const post = await this.postsRepository.findPost(postId);
    if (!post) throw new CustomError(404, Message.POST_DOES_NOT_EXIST);

    const currentComment = await this.commentsRepository.findComment(postId, commentId);
    if (!currentComment) CustomError(404, Message.COMMENT_DOES_NOT_EXIST);

    if (currentComment.UserId !== userId) throw new CustomError(400, Message.COMMENT_EDIT_PERMISSION_DENIED);

    return await this.commentsRepository.updateComment(postId, commentId, userId, comment);
  };

  deleteComment = async (postId, commentId, userId) => {
    const post = await this.postsRepository.findPost(postId);
    if (!post) throw new CustomError(404, Message.POST_DOES_NOT_EXIST);

    const currentComment = await this.commentsRepository.findComment(postId, commentId);
    if (!currentComment) CustomError(404, Message.COMMENT_DOES_NOT_EXIST);

    if (currentComment.UserId !== userId) throw new CustomError(400, Message.COMMENT_EDIT_PERMISSION_DENIED);

    return await this.commentsRepository.deleteComment(postId, commentId, userId);
  };
}
