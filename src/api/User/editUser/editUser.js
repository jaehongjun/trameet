import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { firstName, lastName, bio, avatar } = args;
      const { user } = request;
      const editUser = await prisma.user({
        id: user.id
      });
      if (editUser.id === user.id) {
        await prisma.updateUser({
          data: {
            avatar,
            bio,
            firstName,
            lastName
          },
          where: {
            id: user.id
          }
        });
        return true;
      } else {
        throw Error("uncorrect");
      }
    }
  }
};
