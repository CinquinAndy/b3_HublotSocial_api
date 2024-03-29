import catchAsync from "../libs/catchAsync";
import Model from "../models";
import {jwtToUser} from "../libs/who";
import {deleteElement, findAll, findByPk} from "./request/generic";
import {
    createMessage, findMessage,
    findMessageConversation,
    findMessageUser,
    findMessageUserAndConversation, updateMessage
} from "./request/message";
import _ from "lodash";

const {User} = Model;
const {Message} = Model;

export const getAllMessagesService = catchAsync(async (req, res, next) => {
    const messages = await findMessage(Message);
    const body = messages.map(message => _.omit(message.toJSON()));

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const getMyMessagesService = catchAsync(async (req, res, next) => {
    const actualUser = await jwtToUser(req.cookies.__act, req.cookies.__rt, res, next);

    const messages = await findMessageUser(Message, actualUser.id)

    return res.status(200).json({
        status: "success",
        payload: messages
    });
})

export const getMyMessagesFromConversationService = catchAsync(async (req, res, next) => {
    const actualUser = await jwtToUser(req.cookies.__act, req.cookies.__rt, res, next);
    const id_conversation = req.params['id_conversation'];

    const messages = await findMessageUserAndConversation(Message, {
        "id_user": actualUser.id,
        "id_conversation": id_conversation
    })

    return res.status(200).json({
        status: "success",
        payload: messages
    });
})

export const getAllMessagesFromConversationService = catchAsync(async (req, res, next) => {
    const id_conversation = req.params['id_conversation'];

    const messages = await findMessageConversation(Message, id_conversation)


    return res.status(200).json({
        status: "success",
        payload: messages
    });
})

export const addNewMessageService = catchAsync(async (req, res, next) => {
    const actualUser = await jwtToUser(req.cookies.__act, req.cookies.__rt, res, next);

    const id_conversation = req.body.id_conversation;
    const content = req.body.content;

    const message = await createMessage(Message, {
        "content": content,
        "id_conversation": id_conversation,
        "id_user": actualUser.id
    });

    message.Users = actualUser;

    await message.save();

    return res.status(200).json({
        status: "success",
        payload: message.toJSON()
    });
})

export const updateMessageService = catchAsync(async (req, res, next) => {
    const content = req.body.content;
    const id = req.params['id_message'];

    const messages = await updateMessage(Message, {
        "id": id,
        "content": content
    });

    return res.status(200).json({
        status: "success",
        payload: messages
    });
})

export const deleteMessageService = catchAsync(async (req, res, next) => {
    const id = req.params['id_message'];
    const message = await findByPk(Message, id);

    if (_.isEmpty(message)) {
        return res.status(400).json({
            status: "The message does not exist"
        });
    }

    await message.destroy();

    return res.status(200).json({
        status: "success"
    });
})
