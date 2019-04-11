import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { boardId } = args;
      console.log(args);
      const { user } = request;
      const fillterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            board: {
              id: boardId
            }
          }
        ]
      };
      try {
        const existingLike = await prisma.$exists.like(fillterOptions);
        console.log(existingLike);
        if (existingLike) {
          await prisma.deleteManyLikes(fillterOptions);
        } else {
          const newLike = await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            board: {
              connect: {
                id: boardId
              }
            }
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
