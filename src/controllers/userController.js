import Model from "../models";
import catchAsync from "../libs/catchAsync";
import {userService_getAllUsers, userService_getUser} from "../services/userService";

const {User} = Model;

export const getAllUsers = catchAsync(async (req, res, next) => {
    await userService_getAllUsers(req, res, next);
});

export const getUser = catchAsync(async (req, res, next)=>{
    await userService_getUser(req,res,next);
})
