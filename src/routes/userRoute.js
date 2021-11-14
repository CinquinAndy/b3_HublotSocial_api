import {Router} from "express";
import {jwtProtect} from "../middlewares/jwtAuthMiddleware";
import {getAllUsers, getMe, getUser} from "../controllers/userController";

const router = Router();

router.get("/", jwtProtect, getAllUsers);
router.get("/me", jwtProtect, getMe);
router.get("/:user_email", jwtProtect, getUser);

export default router;
