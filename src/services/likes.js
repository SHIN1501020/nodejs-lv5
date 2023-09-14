import { CustomError } from "../utils/errors/CustomError.js";
import { Message } from "../constants/index.js";

export class LikesService {
  constructor(likesRepository, postsRepository){
    this.likesRepository = likesRepository;
    this.postsRepository = postsRepository;
  }

  setLike = async (userId, postId) => {
    const post = await this.postsRepository.findPost(postId);
    if (!post) throw new CustomError(404, Message.POST_DOES_NOT_EXIST);

    const isLike = await this.likesRepository.findLike(userId, postId);
    if (!isLike) {
      await this.likesRepository.createLike(userId, postId);
      return true;
    }
    await this.likesRepository.deleteLike(isLike.likeId, userId, postId);
    return false;
  };

  getLikes = async (userId) => {
    return await this.likesRepository.findLikes(userId);
  };
}
