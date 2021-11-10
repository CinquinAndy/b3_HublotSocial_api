import catchAsync from "../libs/catchAsync";
import {findParticipantsConversation, findParticipantsUser, findUser} from "./index";
import Model from "../models";
import {jwtToUser} from "../libs/who";

const {User} = Model;
const {Participant} = Model;

export const getParticipantsFromConversationService = catchAsync(async (req, res, next) => {
    const id_conversation = req.params['id_conversation'];
    let temp = findParticipantsConversation(Participant, id_conversation)
    const body = temp.toJSON()

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const getParticipantsFromUserService = catchAsync(async (req, res, next) => {
    const user_email = req.params['user_email'];
    const user = await findUser(User, user_email);
    let temp = findParticipantsUser(User, user['id'])
    const body = temp.toJSON()

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const getParticipantsFromMeService = catchAsync(async (req, res, next) => {
    const actualUser = await jwtToUser(req.cookies.__act, req.cookies.__rt, res, next);
    let temp = findParticipantsUser(User, actualUser['id'])
    const body = temp.toJSON()

    return res.status(200).json({
        status: "success",
        payload: body
    });
})
