import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, files, content } = args;
      try {
        const board = await prisma.createBoard({
          caption,
          content,
          user: {
            connect: {
              id: user.id
            }
          }
        });
        console.log(board);
        files.forEach(async file => {
          await prisma.createFile({
            url: file,
            board: {
              connect: {
                id: board.id
              }
            }
          });
        });
        return board;
      } catch (error) {
        console.log(error);
        throw Error("create fail");
      }
    }
  }
};
