import catchAsync from "../libs/catchAsync";
import Model from "../models";
import {jwtToUser} from "../libs/who";
import {findByPk} from "./request/generic";
import {
    addConversation,
    addUserToConversation, findAllConversation,
    findAllConversationsFromUser, findByBoth, findFromIdConversation,
    findFromTitleConversation
} from "./request/conversation";
import {findUser} from "./request/user";
import _ from "lodash";

const {Conversation} = Model;
const {Participant} = Model;
const {User} = Model;

export const getAllConversationsService = catchAsync(async (req, res, next) => {
    const conversations = await findAllConversation(Conversation);

    return res.status(200).json({
        status: "success",
        payload: conversations
    });
})

export const getConversationFromIdService = catchAsync(async (req, res, next) => {
    const id_conversation = req.params['id_conversation'];

    const conversation = await findFromIdConversation(Conversation, id_conversation);

    return res.status(200).json({
        status: "success",
        payload: conversation,
    });
})

export const getConversationFromTitleService = catchAsync(async (req, res, next) => {
    const conversation_title = req.params['conversation_title'];

    const conversations = await findFromTitleConversation(Conversation, conversation_title);

    return res.status(200).json({
        status: "success",
        payload: conversations
    });
})

export const getMyConversationsService = catchAsync(async (req, res, next) => {
    const actualUser = await jwtToUser(req.cookies.__act, req.cookies.__rt, res, next);

    const conversations = await findAllConversationsFromUser(Conversation, actualUser.id);

    return res.status(200).json({
        status: "success",
        payload: conversations
    });
})

export const addToMyConversationService = catchAsync(async (req, res, next) => {
    const user_email = req.body['email'];
    const id_conversation = req.params['id_conversation'];
    const user = await findUser(User, user_email);
    const body_user = _.omit(user.toJSON(), ["password", "changedPassword", "createdAt", "updatedAt"]);

    const conversation = await findByPk(Conversation, id_conversation)
    const body_conversation = _.omit(conversation.toJSON());

    const participants = await findByBoth(Participant,
        {
            "id_conversation": body_conversation.id,
            "id_user": body_user.id
        })

    if (_.isEmpty(participants)) {
        const conversation_linked = await addUserToConversation(Conversation,
            {
                "id_conversation": body_conversation.id,
                "id_user": body_user.id
            })

        return res.status(200).json({
            status: "success",
            payload: conversation_linked
        });
    }
    return res.status(400).json({
        status: "error",
        message: "the combination of both key already exists"
    });
})

export const addConversationService = catchAsync(async (req, res, next) => {
    const title = req.body.title;

    const conversation = await addConversation(Conversation, {"title": title});

    return res.status(200).json({
        status: "success",
        payload: conversation.toJSON()
    });
})

export const updateConversationService = catchAsync(async (req, res, next) => {
    const id_conversation = req.params['id_conversation'];

    const conversation = await findByPk(Conversation, id_conversation);
    conversation.title = req.body.title;
    await conversation.save();

    if (_.isEmpty(conversation)) {
        return res.status(400).json({
            status: "The conversation does not exist"
        });
    }

    return res.status(200).json({
        status: "success",
        payload: conversation,
    });
})

export const deleteConversationService = catchAsync(async (req, res, next) => {
    const id_conversation = req.params['id_conversation'];

    const conversation = await findByPk(Conversation, id_conversation);
    await conversation.destroy();

    if (_.isEmpty(conversation)) {
        return res.status(400).json({
            status: "The conversation does not exist"
        });
    }

    return res.status(200).json({
        status: "success - deleted",
    });
})
