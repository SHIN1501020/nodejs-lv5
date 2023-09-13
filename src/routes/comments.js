/**
 * 댓글 라우터 모듈
 *
 * 이 모듈은 댓글 생성, 조회, 수정, 삭제 관련된 라우트를 처리합니다.
 *
 * @module src/routes/comments.js
 * @namespace CommentsRouter
 */
import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validation.js";
import ValidSchema from "../utils/joi/index.js";

import { CommentsController } from "../controllers/comments.js";

const router = express.Router();
const commentsController = new CommentsController()

/**
 * 댓글 생성 API - POST '/posts/:postId/comments'
 *
 * @async
 * @function
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @param {function} next - next 미들웨어 함수
 */
router.post("/:postId/comments", authMiddleware, validateBody(ValidSchema.comment), commentsController.createComment);

/**
 * 댓글 조회 API - GET '/posts/:postId/comments'
 *
 * @async
 * @function
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @param {function} next - next 미들웨어 함수
 */
router.get("/:postId/comments", commentsController.getComments);

/**
 * 댓글 수정 API - GET '/posts/:postId/:commentId'
 *
 * @async
 * @function
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @param {function} next - next 미들웨어 함수
 */
router.put("/:postId/comments/:commentId", authMiddleware, validateBody(ValidSchema.comment), commentsController.updateComment);

/**
 * 댓글 삭제 API - DELETE '/posts/:postId/:commentId'
 *
 * @async
 * @function
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @param {function} next - next 미들웨어 함수
 */
router.delete("/:postId/comments/:commentId", authMiddleware, commentsController.deleteComment);

export default router;
