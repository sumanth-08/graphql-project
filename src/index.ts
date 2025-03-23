import express, { Request, Response } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";

const startServer = async () => {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  // @ts-ignore
  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
  });
};

startServer();
