import {Router} from "express";
import {jwtProtect} from "../middlewares/jwtAuthMiddleware";
import {getAllUsers, getUser} from "../controllers/userController";

const router = Router();

router.get("/", jwtProtect, getAllUsers);
router.get("/me", jwtProtect, getMe);
router.get("/:userEmail", jwtProtect, getUser);

export default router;
