import { asyncHandler } from "../middlewares/asyncHandler.js";
import { PostsService } from "../services/posts.js";
import { Message } from "../constants/index.js";

export class PostsController {
  postsService = new PostsService();

  createPost = asyncHandler(async (req, res, next) => {
    const { userId } = req.user;
    const { title, content } = req.body;

    await this.postsService.createPost(userId, title, content);

    return res.status(201).json({ message: Message.POST_CREATED });
  });

  getPosts = asyncHandler(async (req, res, next) => {
    const posts = await this.postsService.findAllPosts();
    return res.status(200).json({ posts: posts });
  });

  getPostById = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postsService.findPostById(postId);
    return res.status(200).json({ post: post });
  });

  updatePost = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.user;
    const { title, content } = req.body;

    await this.postsService.updatePost(postId, userId, title, content);
    return res.status(200).json({ message: Message.POST_EDIT_SUCCESS });
  });

  deletePost = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.user;

    await this.postsService.deletePost(postId, userId);
    return res.status(200).json({ message: Message.POST_DELETE_SUCCESS });
  });
}
