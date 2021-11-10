import {Router} from "express";
import {jwtProtect} from "../middlewares/jwtAuthMiddleware";
import {
    getParticipantsFromConversation,
    getParticipantsFromMe,
    getParticipantsFromUser
} from "../controllers/participantsController";


const router = Router();

router.get("/:conversation_id", jwtProtect, getParticipantsFromConversation);
router.get("/:user_email", jwtProtect, getParticipantsFromUser);
router.get("/", jwtProtect, getParticipantsFromMe);

export default router;
