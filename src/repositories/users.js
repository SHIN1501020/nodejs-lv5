export class UsersRepository {
  constructor(prisma){
    this.prisma = prisma;
  }

  findUser = async (nickname) => {
    return await this.prisma.users.findFirst({
      where: { nickname },
    });
  };

  createUser = async (nickname, password) => {
    return await this.prisma.users.create({
      data: {
        nickname,
        password,
      },
    });
  };
}
