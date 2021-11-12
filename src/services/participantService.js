import catchAsync from "../libs/catchAsync";
import Model from "../models";
import {jwtToUser} from "../libs/who";
import {findFromIdConversation} from "./request/conversation";
import {findOrCreateParticipantsBoth, findParticipantsUser} from "./request/participant";
import {findUser} from "./request/user";

const {User} = Model;
const {Participant} = Model;

export const getParticipantsFromConversationService = catchAsync(async (req, res, next) => {
    const id_conversation = req.params['id_conversation'];
    let temp = findFromIdConversation(Participant, id_conversation)
    const body = JSON.stringify(temp)

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const getParticipantsFromUserService = catchAsync(async (req, res, next) => {
    const user_email = req.params['user_email'];
    const user = await findUser(User, user_email);
    let temp = await findParticipantsUser(User, user['id'])
    const body = JSON.stringify(temp)

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const getParticipantsFromMeService = catchAsync(async (req, res, next) => {
    const actualUser = await jwtToUser(req.cookies.__act, req.cookies.__rt, res, next);
    let temp = await findParticipantsUser(User, actualUser['id'])
    const body = JSON.stringify(temp)

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const addParticipantsService = catchAsync(async (req, res, next) => {
    const id_user = req.body.id_user;
    const id_conversation = req.body.id_conversation;

    const [participant, created] = await findOrCreateParticipantsBoth(Participant, {
        'id_user': id_user,
        'id_conversation': id_conversation
    });

    if (!created) {
        return res.status(400).json({
            status: "fail",
            message: "this user is already in this conversation"
        });
    }
    return res.status(201).json({
        status: "success",
        message: "Participant successfully added",
        payload: participant.toJSON()
    });
})

export const addParticipantsFromMailService = catchAsync(async (req, res, next) => {
    const user_email = req.body['email'];
    const user = await findUser(User, user_email);

    const id_user = user.id;
    const id_conversation = req.body.id_conversation;

    const [participant, created] = await findOrCreateParticipantsBoth(Participant, {
        'id_user': id_user,
        'id_conversation': id_conversation
    });

    if (!created) {
        return res.status(400).json({
            status: "fail",
            message: "this user is already in this conversation"
        });
    }

    return res.status(201).json({
        status: "success",
        message: "Participant successfully added",
        payload: participant.toJSON()
    });
})
