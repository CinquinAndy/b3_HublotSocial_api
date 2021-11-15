import catchAsync from "../libs/catchAsync";
import {
    userService_delete, userService_deleteFromEmail, userService_deleteFromId,
    userService_getAllUsers,
    userService_getMe,
    userService_getUser,
    userService_patchMe
} from "../services/userService";

export const getAllUsers = catchAsync(async (req, res, next) => {
    await userService_getAllUsers(req, res, next);
});

export const getUser = catchAsync(async (req, res, next)=>{
    await userService_getUser(req,res,next);
})

export const getMe = catchAsync(async (req, res, next)=>{
  await userService_getMe(req,res,next);
})
export const patchMe = catchAsync(async (req, res, next)=>{
  await userService_patchMe(req,res,next);
})
export const deleteFromEmail = catchAsync(async (req, res, next)=>{
  await userService_deleteFromEmail(req,res,next);
})
export const deleteFromId = catchAsync(async (req, res, next)=>{
  await userService_deleteFromId(req,res,next);
})
