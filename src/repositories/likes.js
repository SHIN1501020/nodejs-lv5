import { prisma } from "../utils/prisma/index.js";
export class LikesRepository {
    findLike = async(userId, postId)=>{
        return await prisma.likes.findFirst({
            where: {
                UserId: userId,
                PostId: postId,
            }
        });
    }

    createLike = async(userId, postId)=>{
        return await prisma.likes.create({
            data:{
                UserId: userId,
                PostId: postId,
            }
        })
    }

    deleteLike = async(likeId, userId, postId)=>{
        return await prisma.likes.delete({
            where: {
                likeId: likeId,
                UserId: userId,
                PostId: postId
            }
        })
    }

    findLikes = async(userId)=>{
        return await prisma.posts.findMany({
            where:{
                Likes: {
                    some: {
                        UserId: userId
                    }
                }
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
                //* Likes 개수 구하기
                _count: {
                    select: {
                        Likes: true,
                    }
                },
            },
            //* _count로 내림차순 정렬
            orderBy: {
                Likes: {
                    _count: "desc",
                }
            }
        })
    }
}