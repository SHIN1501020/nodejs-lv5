export class PostsRepository {
  constructor(prisma){ // Prisma Client를 의존성 주입(DI)을 이용해 개선
    this.prisma = prisma;
  }
  createPost = async (userId, title, content) => {
    return await this.prisma.create({
      data: {
        UserId: userId,
        title,
        content,
      },
    });
  };

  findAllPosts = async () => {
    return await this.prisma.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        postId: true,
        Users: {
          select: {
            userId: true,
            nickname: true,
          },
        },
        title: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            Likes: true,
          },
        },
      },
    });
  };

  findPostById = async (postId) => {
    return await this.prisma.posts.findFirst({
      where: { postId: postId },
      select: {
        postId: true,
        Users: {
          select: {
            userId: true,
            nickname: true,
          },
        },
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            Likes: true,
          },
        },
      },
    });
  };

  //* findUnique로 핃드 전체 조회
  findPost = async (postId) => {
    return await this.prisma.posts.findUnique({
      where: {
        postId: postId,
      },
    });
  };

  updatePost = async (postId, title, content) => {
    return await this.prisma.posts.update({
      data: {
        title,
        content,
      },
      where: {
        postId: postId,
      },
    });
  };

  deletePost = async (postId, title, content) => {
    return await this.prisma.posts.delete({
      where: {
        postId: postId,
      },
    });
  };
}
