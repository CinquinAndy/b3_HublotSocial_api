import {Router} from "express";
import {jwtProtect} from "../middlewares/jwtAuthMiddleware";
import {
    addConversation, addToMyConversation, deleteConversation,
    getAllConversations,
    getConversationFromId,
    getConversationFromTitle, getMyConversations, updateConversation
} from "../controllers/conversationController";


const router = Router();

router.get("/", jwtProtect, getAllConversations);
router.get("/id/:id_conversation", jwtProtect, getConversationFromId);
router.get("/title/:conversation_title", jwtProtect, getConversationFromTitle);
router.get("/me", jwtProtect, getMyConversations)
router.post("/:id_conversation", jwtProtect, addToMyConversation)
router.post("/", jwtProtect, addConversation)
router.patch("/:id_conversation", jwtProtect, updateConversation)
router.delete("/:id_conversation", jwtProtect, deleteConversation)

export default router;
