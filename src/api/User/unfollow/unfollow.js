import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unfollow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          data: {
            following: {
              disconnect: {
                id
              }
            }
          },
          where: {
            id: user.id
          }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
