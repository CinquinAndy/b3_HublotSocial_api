import catchAsync from "../libs/catchAsync";
import Model from "../models";
import {jwtToUser} from "../libs/who";
import {findAll, findByPk} from "./request/generic";
import {
    addConversation,
    addUserToConversation,
    findAllConversationsFromUser,
    findFromTitleConversation,
    findOrCreateConversation
} from "./request/conversation";
import {findUser} from "./request/user";

const {Conversation} = Model;
const {User} = Model;

export const getAllConversationsService = catchAsync(async (req, res, next) => {
    const conversations = findAll(Conversation);
    const body = JSON.stringify(conversations)

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const getConversationFromIdService = catchAsync(async (req, res, next) => {
    const conversation_id = req.params['conversation_id'];

    const conversation = await findByPk(Conversation, conversation_id);

    return res.status(200).json({
        status: "success",
        payload: conversation.toJSON(),
    });
})

export const getConversationFromTitleService = catchAsync(async (req, res, next) => {
    const conversation_title = req.params['conversation_title'];

    const conversations = await findFromTitleConversation(Conversation, conversation_title);
    const body = JSON.stringify(conversations)

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const getMyConversationsService = catchAsync(async (req, res, next) => {
    const actualUser = await jwtToUser(req.cookies.__act, req.cookies.__rt, res, next);

    const conversations = await findAllConversationsFromUser(Conversation,actualUser.id);
    const body = JSON.stringify(conversations)

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const addToMyConversationService = catchAsync(async (req, res, next) => {
    const user_email = req.body['email'];
    const id_conversation = req.params['id_conversation'];
    const user = await findUser(User, user_email);

    const conversation = await findByPk(Conversation,{"id":id_conversation})
    const conversation_linked = await addUserToConversation(Conversation,{"conversation_id":conversation.id,"user_id":user.id})

    return res.status(200).json({
        status: "success",
        payload: conversation_linked.toJSON()
    });
})

export const addConversationService = catchAsync(async (req, res, next) => {
    const title = req.body.title;

    const conversation = await addConversation(Conversation,title);

    return res.status(200).json({
        status: "success",
        payload: conversation.toJSON()
    });
})
