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

import { LikesController } from "../controllers/likes.js";

const router = express.Router();
const likesController = new LikesController();

router.post('/:postId/like', authMiddleware, likesController.setLike);

router.get('/like', authMiddleware, likesController.getLikes);

export default router;