import {Router} from "express";
import {jwtProtect} from "../middlewares/jwtAuthMiddleware";
import {
    addConversation, addToMyConversation,
    getAllConversations,
    getConversationFromId,
    getConversationFromTitle, getMyConversations
} from "../controllers/conversationController";


const router = Router();

router.get("/", jwtProtect, getAllConversations);
router.get("/:conversation_id", jwtProtect, getConversationFromId);
router.get("/:conversation_title", jwtProtect, getConversationFromTitle);
router.get("/me", jwtProtect, getMyConversations)
router.post("/:conversation_id", jwtProtect, addToMyConversation)
router.post("/", jwtProtect, addConversation)

export default router;
