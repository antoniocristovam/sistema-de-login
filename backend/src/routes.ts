import { Router } from "express";
import { UserController } from "./controller/userController";
import { AuthController } from "./controller/AuthController";
import { AuthMiddlewares } from "./controller/middlewares/auth";

const usercontroller = new UserController();
const authController = new AuthController();

export const router = Router();

router.post("/create", usercontroller.store);
router.get("/users", AuthMiddlewares, usercontroller.index);
router.post("/auth", authController.autheticate);
