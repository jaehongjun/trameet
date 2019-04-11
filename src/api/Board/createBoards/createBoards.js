import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createBoards: async (_, args, { request }) => {
      isAuthenticated(request);
      const { location, caption, content, files } = args;
      const { user } = request;
      try {
        const board = await prisma.createBoard({
          caption,
          files,
          location,
          user: {
            connect: {
              id: user.id
            }
          },
          content
        });
        return board;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
