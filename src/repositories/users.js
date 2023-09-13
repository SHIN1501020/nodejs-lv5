import { prisma } from "../utils/prisma/index.js";
export class UsersRepository {
  findUser = async (nickname) => {
    return await prisma.users.findFirst({
      where: { nickname },
    });
  };

  createUser = async (nickname, password) => {
    return await prisma.users.create({
      data: {
        nickname,
        password,
      },
    });
  };
}
