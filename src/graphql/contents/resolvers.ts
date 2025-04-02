import contentService, { CreateContentPayload } from "../../services/content";

const queries = {};

const mutations = {
  createContent: async (_: any, payload: CreateContentPayload, context: any) => {
    const { title, description } = payload;
    const res = await contentService.createContent({ title, description, authorId: context.user.id });
    return res.id;
  },
};

export const resolvers = { queries, mutations };
