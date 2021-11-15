import {Router} from "express";
import {jwtProtect} from "../middlewares/jwtAuthMiddleware";
import {deleteFromEmail, deleteFromId, getAllUsers, getMe, getUser, patchMe} from "../controllers/userController";

const router = Router();

router.get("/", jwtProtect, getAllUsers);
router.get("/me", jwtProtect, getMe);
router.get("/:user_email", jwtProtect, getUser);
router.patch("/me", jwtProtect, patchMe);
router.delete("/email/:user_email", jwtProtect, deleteFromEmail);
router.delete("/id/:id_user", jwtProtect, deleteFromId);


export default router;
