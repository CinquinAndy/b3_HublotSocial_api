import catchAsync from "../libs/catchAsync";
import {userService_getAllUsers, userService_getUser} from "../services/userService";

export const getAllUsers = catchAsync(async (req, res, next) => {
    await userService_getAllUsers(req, res, next);
});

export const getUser = catchAsync(async (req, res, next)=>{
    await userService_getUser(req,res,next);
})

export const getMe = catchAsync(async (req, res, next)=>{
  await userService_getMe(req,res,next);
})
