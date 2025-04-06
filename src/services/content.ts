import { prismaClient } from "../lib/db";

export interface CreateContentPayload {
  title: string;
  description: string;
  authorId: string;
}

// export interface GetContentPayload {
//   id: string;
//   title: string;
//   description: string;
//   authorId: string;
//   createdAt: Date;
// }

class contentService {
  public static createContent(payload: CreateContentPayload) {
    const { title, description, authorId } = payload;
    return prismaClient.content.create({
      data: {
        title,
        description,
        authorId,
        createdAt: new Date().toJSON(),
      },
    });
  }

  // get content data
  public static async getContent() {
    return await prismaClient.content.findMany();
  }
}

export default contentService;
