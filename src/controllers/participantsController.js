import catchAsync from "../libs/catchAsync";
import {
    addParticipantsFromMailService,
    addParticipantsService,
    getParticipantsFromConversationService,
    getParticipantsFromMeService,
    getParticipantsFromUserService, getParticipantsService
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
export const getParticipants = catchAsync(async (req, res, next) => {
    await getParticipantsService(req, res, next);
})

export const addParticipants = catchAsync(async (req,res,next)=>{
    await addParticipantsService(req,res,next);
})
export const addParticipantsFromMail = catchAsync(async (req,res,next)=>{
    await addParticipantsFromMailService(req,res,next);
})
