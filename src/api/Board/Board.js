import { prisma } from "../../../generated/prisma-client";

export default {
  Board: {
    isLiked: (parent, __, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            board: {
              id
            }
          }
        ]
      });
    }
  }
};
