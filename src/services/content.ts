import { prismaClient } from "../lib/db";

export interface CreateContentPayload {
  title: string;
  description: string;
  authorId: string;
}

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
}

export default contentService;
