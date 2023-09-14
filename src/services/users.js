import { CustomError } from "../utils/errors/CustomError.js";
import { Message } from "../constants/index.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsersService {
  constructor(usersRepository){
    this.usersRepository = usersRepository;
  }

  createUser = async (nickname, password) => {
    const isExistUser = await this.usersRepository.findUser(nickname);
    if (isExistUser) throw new CustomError(412, Message.DUPLICATE_NICKNAME);

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.createUser(nickname, hashedPassword);
  };

  getUser = async (nickname, password) => {
    const user = await this.usersRepository.findUser(nickname);
    if (!user) throw new CustomError(412, Message.USER_DOES_NOT_EXIST);

    if (!(await bcrypt.compare(password, user.password))) throw new CustomError(412, Message.USER_DOES_NOT_EXIST);
    return jwt.sign(
      {
        userId: user.userId,
      },
      process.env.SECRET_KEY //! 비밀키 .env 파일에 넣어줘야한다
    );
  };
}
