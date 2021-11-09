import {Router} from "express";
import {
    signupController,
    signinController
} from "../controllers/authController";
import {signinAuth} from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/register", signupController);
authRouter.post("/login", signinAuth, signinController);

export default authRouter;
