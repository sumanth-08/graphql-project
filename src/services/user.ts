import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db";
import JWT from "jsonwebtoken";

export interface CreateUSerPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface GetUserToken {
  email: string;
  password: string;
}

class UserService {
  // hash password
  private static getHasedPassword(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
    return hashedPassword;
  }

  // signup
  public static craeteUser(payload: CreateUSerPayload) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = this.getHasedPassword(salt, password);
    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword,
      },
    });
  }

  // find by email
  private static getUserEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  // find by id
  public static getUserById(id: string) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  // login
  public static async getUserToken(payload: GetUserToken) {
    const { email, password } = payload;

    const user = await this.getUserEmail(email);
    if (!user) {
      throw new Error("User not found!");
    }

    const salt = user.salt;
    const hashedPassword = this.getHasedPassword(salt, password);

    if (hashedPassword !== user.password) {
      throw new Error("Incorrect password");
    }

    // token
    const token = JWT.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string);
    return token;
  }

  public static async decodeJWTToken(token: string) {
    const decoded = JWT.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  }
}

export default UserService;
