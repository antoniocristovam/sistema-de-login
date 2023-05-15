import { Router } from "express";
import { UserController } from "./controller/userController";
import { AuthController } from "./controller/AuthController";

const usercontroller = new UserController();
const authController = new AuthController();

export const router = Router();

router.post("/create", usercontroller.store);
router.get("/users", usercontroller.index);
router.post("/auth", authController.authticate);
