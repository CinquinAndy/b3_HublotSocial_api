import catchAsync from "../libs/catchAsync";
import {
    getParticipantsFromConversationService,
    getParticipantsFromMeService,
    getParticipantsFromUserService
} from "../services/participantService";

export const getParticipantsFromConversation = catchAsync(async (req, res, next) => {
    await getParticipantsFromConversationService(req, res, next);
})

export const getParticipantsFromUser = catchAsync(async (req, res, next) => {
    await getParticipantsFromUserService(req, res, next);
})

export const getParticipantsFromMe = catchAsync(async (req, res, next) => {
    await getParticipantsFromMeService(req, res, next);
})
