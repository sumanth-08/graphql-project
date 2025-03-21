import express, { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const startServer = async () => {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String!
        }
    `,
    resolvers: {
      Query: {
        hello: () => `hello im graphql`,
      },
    },
  });

  await gqlServer.start();

  // @ts-ignore
  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
  });
};

startServer();
