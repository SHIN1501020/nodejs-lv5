/**
 * 사용자 라우터 모듈
 *
 * 이 모듈은 회원가입, 로그인 관련된 라우트를 처리합니다.
 *
 * @module scr/routes/post
 * @namespace UsersRouter
 */

import express from "express";
import { validateBody } from "../middlewares/validation.js";
import ValidSchema from "../utils/joi/index.js";

import { UsersController } from "../controllers/users.js";

const router = express.Router();
const usersController = new UsersController();

/**
 * 회원가입 API - POST '/signup'
 *
 * @async
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @param {function} next - next 미들웨어 함수
 */
router.post("/signup", validateBody(ValidSchema.signup), usersController.signup);

/**
 * 로그인 API - POST '/login'
 *
 * @async
 * @function
 * @param {object} req - 요청 객체
 * @param {object} res - 응답 객체
 * @param {function} next - next 미들웨어 함수
 */
router.post("/login", usersController.login);

export default router;
