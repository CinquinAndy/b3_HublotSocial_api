import catchAsync from "../libs/catchAsync";

export const getAllMessages = catchAsync(async (req, res, next) => {
    await getAllMessagesService(req, res, next);
})

export const getMyMessages = catchAsync(async (req, res, next) => {
    await getMyMessagesService(req, res, next);
})

export const getMyMessagesFromConversation = catchAsync(async (req, res, next) => {
    await getMyMessagesFromConversationService(req, res, next);
})

export const getAllMessagesFromConversation = catchAsync(async (req, res, next) => {
    await getAllMessagesFromConversationService(req, res, next);
})

export const addNewMessage = catchAsync(async (req, res, next) => {
    await addNewMessageService(req, res, next);
})

export const updateMessage = catchAsync(async (req, res, next) => {
    await updateMessageService(req, res, next);
})

export const deleteMessage = catchAsync(async (req, res, next) => {
    await deleteMessageService(req, res, next);
})
