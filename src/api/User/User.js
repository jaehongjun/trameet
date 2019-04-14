import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    boards: ({ id }) => prisma.user({ id }).boards(),

    isSelf: (parent, __, { request }) => {
      const { user } = request;
      return user.id === parent.id;
    },
    isFollowing: (parent, __, { request }) => {
      const { user } = request;
      // 포함이 되어 있냐
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              following_some: {
                id: parent.id
              }
            }
          ]
        });
      } catch (error) {
        return false;
      }
    }
  }
};
