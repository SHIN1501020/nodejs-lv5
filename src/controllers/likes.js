import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Message } from "../constants/index.js";

export class LikesController {
  constructor(likesService){
    this.likesService = likesService;
  }

  setLike = asyncHandler(async (req, res, next) => {
    const { userId } = req.user;
    const { postId } = req.params;

    const isLike = await this.likesService.setLike(userId, postId);
    return res.status(200).json({ message: isLike ? Message.POST_LIKE : Message.POST_UNLIKE });
  });

  getLikes = asyncHandler(async (req, res, next) => {
    const { userId } = req.user;
    
    const posts = await this.likesService.getLikes(userId);
    return res.status(200).json({ posts: posts });
  });
}
