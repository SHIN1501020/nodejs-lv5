export class CommentsRepository {
  constructor(prisma){
    this.prisma = prisma
  }
  
  createComment = async (postId, userId, comment) => {
    return await this.prisma.comments.create({
      data: {
        PostId: postId,
        UserId: userId,
        comment,
      },
    });
  };

  findComments = async (postId) => {
    return await this.prisma.comments.findMany({
      where: {
        PostId: postId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        commentId: true,
        Users: {
          select: {
            userId: true,
            nickname: true,
          },
        },
        comment: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };

  findComment = async (postId, commentId) => {
    return await this.prisma.comments.findFirst({
      where: {
        PostId: postId,
        commentId: commentId,
      },
    });
  };

  updateComment = async (postId, commentId, userId, comment) => {
    return await this.prisma.comments.update({
      data: { comment },
      where: {
        PostId: postId,
        UserId: userId,
        commentId: commentId,
      },
    });
  };

  deleteComment = async (postId, commentId, userId) => {
    return await this.prisma.comments.delete({
      where: {
        PostId: postId,
        UserId: userId,
        commentId: commentId,
      },
    });
  };
}
