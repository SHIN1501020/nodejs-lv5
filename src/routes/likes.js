/**
 * 좋아요 라우터 모듈
 *
 * 이 모듈은 게시글에 대해 좋아요를 조회 및 수정과 관련된 라우트를 처리합니다.
 *
 * @module src/routes/likes.js
 * @namespace LikesRouter
 */
import express from "express";
import authMiddleware from "../middlewares/auth.js";

import { prisma } from "../utils/prisma/index.js";
import { LikesRepository } from "../repositories/likes.js";
import { PostsRepository } from "../repositories/posts.js";
import { LikesService } from "../services/likes.js";
import { LikesController } from "../controllers/likes.js";


const router = express.Router();
const likesRepository = new LikesRepository(prisma);
const postsRepository = new PostsRepository(prisma);
const likesService = new LikesService(likesRepository, postsRepository);
const likesController = new LikesController(likesService);


/**
 * 좋아요 API - POST '/posts/:postId/like'
 */
router.post("/:postId/like", authMiddleware, likesController.setLike);

/**
 * 좋아요 조회 API - GET '/posts/like'
 */
router.get("/like", authMiddleware, likesController.getLikes);

export default router;
