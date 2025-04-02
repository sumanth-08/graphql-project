import { ApolloServer } from "@apollo/server";
import { User } from "./users";
import { Content } from "./contents";

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
        ${User.typeDefs}
        ${Content.typeDefs}
        
        type Query {
            ${User.queries}
            ${Content.queries}
        }
            
        type Mutation {
            ${User.mutations}
            ${Content.mutations}
        }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Content.resolvers.queries,
      },

      Mutation: {
        ...User.resolvers.mutations,
        ...Content.resolvers.mutations,
      },
    },
  });

  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
