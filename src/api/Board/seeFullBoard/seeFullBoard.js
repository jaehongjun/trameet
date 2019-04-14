import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullBoard: (_, args) => {
      const { id } = args;
      return prisma.board({
        id
      });
    }
  }
};
