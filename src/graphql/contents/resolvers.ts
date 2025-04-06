import contentService, { CreateContentPayload } from "../../services/content";
import UserService from "../../services/user";

// const Content = {
//   user: async (user: any) => await UserService.getUserById(user.authorId),
// };

const queries = {
  getAllContent: async () => {
    return await contentService.getContent();
  },
};

const mutations = {
  createContent: async (_: any, payload: CreateContentPayload, context: any) => {
    const { title, description } = payload;

    if (!context || !context.user) {
      throw new Error("Invalid Token");
    }
    const res = await contentService.createContent({ title, description, authorId: context.user.id });
    return res.id;
  },
};

export const resolvers = { queries, mutations };
