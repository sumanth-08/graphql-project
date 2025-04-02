import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user";

const startServer = async () => {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  // @ts-ignore
  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer(), { context: async ({ req }) => {
   const token = req.headers["token"];
   try {
    const user = await UserService.decodeJWTToken(token as string);
    return { user };
   } catch (error) {
    return {};
   }
  } }));

  app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
  });
};

startServer();
