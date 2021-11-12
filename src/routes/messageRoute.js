import {Router} from "express";
import {jwtProtect} from "../middlewares/jwtAuthMiddleware";
import {
    addNewMessage,
    deleteMessage, getAllMessages,
    getAllMessagesFromConversation, getMyMessages, getMyMessagesFromConversation,
    updateMessage
} from "../controllers/messageController";


const router = Router();

router.get("/", jwtProtect, getAllMessages);
router.get("/me", jwtProtect, getMyMessages);
router.get("/me/:id_conversation", jwtProtect, getMyMessagesFromConversation);
router.get("/:id_conversation", jwtProtect, getAllMessagesFromConversation)
router.post("/", jwtProtect, addNewMessage)
router.patch("/:id_message", jwtProtect, updateMessage)
router.delete("/:id_message", jwtProtect, deleteMessage)

export default router;
