export class UsersRepository {
  constructor(prisma){
    this.prisma = prisma;
  }

  findUser = async (nickname) => {
    return await this.prisma.findFirst({
      where: { nickname },
    });
  };

  createUser = async (nickname, password) => {
    return await this.prisma.create({
      data: {
        nickname,
        password,
      },
    });
  };
}
