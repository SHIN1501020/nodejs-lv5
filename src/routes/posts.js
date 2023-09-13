/**
 * 게시글 라우터 모듈
 *
 * 이 모듈은 게시글 생성, 조회, 상세 조회, 수정, 삭제 관련된 라우트를 처리합니다.
 *
 * @module src/routes/post.js
 * @namespace PostsRouter
 */
import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validation.js";
import ValidSchema from "../utils/joi/index.js";

import { PostsController } from "../controllers/posts.js"


const router = express.Router();
const postsController = new PostsController();
/**
 * 게시글 생성 API - POST '/posts'
 *
 * @async
 * @function
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @param {function} next - next 미들웨어 함수
 */
router.post("/", authMiddleware, validateBody(ValidSchema.post), postsController.createPost);

/**
 * 게시글 조회 API - GET '/posts'
 *
 * @async
 * @function
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @param {function} next - next 미들웨어 함수
 */
router.get("/", postsController.getPosts);

/**
 * 게시글 상세 조회 API - GET '/posts/:postId'
 *
 * @async
 * @function
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @param {function} next - next 미들웨어 함수
 */
router.get("/:postId", postsController.getPostById);

/**
 * 게시글 수정 API - PUT '/posts/:postId'
 *
 * @async
 * @function
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @param {function} next - next 미들웨어 함수
 */
router.put("/:postId", authMiddleware, validateBody(ValidSchema.post), postsController.updatePost);

/**
 * 게시글 삭제 API - DELETE '/posts/:postId'
 *
 * @async
 * @function
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @param {function} next - next 미들웨어 함수
 */
router.delete("/:postId", authMiddleware, postsController.deletePost);

export default router;
