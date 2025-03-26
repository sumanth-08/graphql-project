import UserService, { CreateUSerPayload, GetUserToken } from "../../services/user";

const queries = {
  getUserToken: async (_: any, payload: GetUserToken) => {
    const res = await UserService.getUserToken({ email: payload.email, password: payload.password });
    return res;
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUSerPayload) => {
    const res = await UserService.craeteUser(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
