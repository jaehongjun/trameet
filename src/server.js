import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import logger from "morgan";
import { authenticateJwt } from "./passport";
const PORT = 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
