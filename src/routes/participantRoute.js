import {Router} from "express";
import {jwtProtect} from "../middlewares/jwtAuthMiddleware";
import {
    addParticipants, addParticipantsFromMail, getParticipants,
    getParticipantsFromConversation,
    getParticipantsFromMe,
    getParticipantsFromUser
} from "../controllers/participantsController";


const router = Router();

router.get("/id/:id_conversation", jwtProtect, getParticipantsFromConversation);
router.get("/email/:user_email", jwtProtect, getParticipantsFromUser);
router.get("/me", jwtProtect, getParticipantsFromMe);
router.get("/", jwtProtect, getParticipants);
router.post("/", jwtProtect, addParticipants)
router.post("/add_from_user", jwtProtect, addParticipantsFromMail)

export default router;
