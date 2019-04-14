import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editBoard: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const EDIT = "EDIT";
      const DELETE = "DELETE";
      const { id, caption, location, content, action } = args;
      const { user } = request;
      const board = await prisma.$exists.board({
        id,
        user: {
          id: user.id
        }
      });
      console.log(board);
      if (board) {
        if (action === EDIT) {
          return await prisma.updateBoard({
            data: {
              caption,
              location,
              content
            },
            where: {
              id
            }
          });
        } else if (action === DELETE) {
          return await prisma.deleteBoard({
            id
          });
        }
      } else {
        throw Error("delete 실패");
      }
    }
  }
};
