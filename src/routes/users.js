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

import { prisma } from "../utils/prisma/index.js";
import { UsersRepository } from "../repositories/users.js"
import { UsersService } from "../services/users.js"
import { UsersController } from "../controllers/users.js";


const router = express.Router();
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

/**
 * 회원가입 API - POST '/signup'
 */
router.post("/signup", validateBody(ValidSchema.signup), usersController.signup);

/**
 * 로그인 API - POST '/login'
 */
router.post("/login", usersController.login);

export default router;
