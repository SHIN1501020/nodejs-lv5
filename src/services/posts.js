import { CustomError } from "../utils/errors/CustomError.js";
import { Message } from "../constants/index.js";

export class PostsService {
  constructor(postsRepository){
    this.postsRepository = postsRepository
  }

  createPost = async (userId, title, content) => {
    return await this.postsRepository.createPost(userId, title, content);
  };

  findAllPosts = async () => {
    return await this.postsRepository.findAllPosts();
  };

  findPostById = async (postId) => {
    return await this.postsRepository.findPostById(postId);
  };

  updatePost = async (postId, userId, title, content) => {
    const post = await this.postsRepository.findPost(postId);
    if (!post) throw new CustomError(404, Message.POST_DOES_NOT_EXIST);
    if (post.UserId !== userId) throw new CustomError(403, Message.POST_EDIT_PERMISSION_DENIED);
    return await this.postsRepository.updatePost(postId, title, content);
  };

  deletePost = async (postId, userId) => {
    const post = await this.postsRepository.findPost(postId);
    if (!post) throw new CustomError(404, Message.POST_DOES_NOT_EXIST);
    if (post.UserId !== userId) throw new CustomError(403, Message.POST_DELETE_PERMISSION_DENIED);
    return await this.postsRepository.deletePost(postId);
  };
}
