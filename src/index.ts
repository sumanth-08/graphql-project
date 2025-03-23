import express, { Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";

const startServer = async () => {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
          hello: String!
        }
        
        type Mutation {
          createUser(
            firstName: String!
            lastName: String!
            email: String!
            password: String!
          ): Boolean
        }
    `,
    resolvers: {
      Query: {
        hello: () => `hello im graphql`,
      },

      Mutation: {
        createUser: async (_, { firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }) => {
          await prismaClient.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt: "random",
            },
          });
          return true;
        },
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
