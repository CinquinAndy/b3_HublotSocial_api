import catchAsync from "../libs/catchAsync";
import {
    addConversationService,
    addToMyConversationService,
    deleteConversationService,
    getAllConversationsService,
    getConversationFromIdService,
    getConversationFromTitleService,
    getMyConversationsService,
    updateConversationService
} from "../services/conversationService";

export const getAllConversations = catchAsync(async (req, res, next) => {
    await getAllConversationsService(req,res,next);
})

export const getConversationFromId = catchAsync(async (req, res, next) => {
    await getConversationFromIdService(req,res,next);
})

export const getConversationFromTitle = catchAsync(async (req, res, next) => {
    await getConversationFromTitleService(req,res,next);
})

export const getMyConversations = catchAsync(async (req,res,next)=>{
    await getMyConversationsService(req,res,next);
})

export const addToMyConversation = catchAsync(async (req, res, next) => {
    await addToMyConversationService(req,res,next);
})

export const addConversation = catchAsync(async (req, res, next) => {
    await addConversationService(req,res,next);
})
export const updateConversation = catchAsync(async (req, res, next) => {
    await updateConversationService(req,res,next);
})

export const deleteConversation = catchAsync(async (req, res, next) => {
    await deleteConversationService(req,res,next);
})

