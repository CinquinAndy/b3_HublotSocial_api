import {Router} from "express";
import {jwtProtect} from "../middlewares/jwtAuthMiddleware";
import {
    addParticipants, addParticipantsFromMail,
    getParticipantsFromConversation,
    getParticipantsFromMe,
    getParticipantsFromUser
} from "../controllers/participantsController";


const router = Router();

router.get("/:conversation_id", jwtProtect, getParticipantsFromConversation);
router.get("/:user_email", jwtProtect, getParticipantsFromUser);
router.get("/", jwtProtect, getParticipantsFromMe);
router.post("/", jwtProtect, addParticipants)
router.post("/add_from_user", jwtProtect, addParticipantsFromMail)

export default router;
