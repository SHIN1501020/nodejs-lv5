export class UsersRepository {
  constructor(prisma){
    this.prisma = prisma;
  }

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
