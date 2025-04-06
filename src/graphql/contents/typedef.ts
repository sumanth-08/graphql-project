export const typeDefs = `#gql
    scalar Date

    type Content {
        id: ID!
        title: String!
        description: String!
        authorId: ID!
        createdAt: Date!
    }
`;
