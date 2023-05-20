import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { hash } from "bcryptjs";

export class UserController {
  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json({ users });
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.json({ error: "Usuário já existe" });
    }

    const hash_password = await hash(password, 8);
    console.log(req.body);
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash_password,
        },
      });

      const createdUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      return res.json({ createdUser });
    } catch (error) {
      return res.json({ error });
    }
  }
}
