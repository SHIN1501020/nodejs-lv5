import { prisma } from '../utils/prisma/index.js'

export class PostsRepository {
    createPost = async(userId, title, content)=>{
        return await prisma.posts.create({
            data: {
                UserId: userId,
                title,
                content,
            },
        });
    }

    findAllPosts = async()=>{
        return await prisma.posts.findMany({
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
                }
              }
            },
        });
    }

    findPostById = async(postId)=>{
        return await prisma.posts.findFirst({
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
                }
              }
            },
        });
    }

    //* findUnique로 핃드 전체 조회
    findPost = async(postId)=>{
      return await prisma.posts.findUnique({
          where: {
            postId: postId,
          },
      });
    }

    updatePost = async(postId, title, content)=>{
      return await prisma.posts.update({
          data: {
            title,
            content,
          },
          where: {
            postId: postId,
          },
      });
    }

    deletePost = async(postId, title, content)=>{
      return await prisma.posts.delete({
          where: {
            postId: postId,
          },
      });
    }
}