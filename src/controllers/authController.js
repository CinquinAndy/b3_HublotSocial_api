import {signupService, signinService} from "../services/authService";
import catchAsync from "../libs/catchAsync";

export const signupController = catchAsync(async (req, res, next) => {
    await signupService(req, res, next);
});

export const signinController = async (req, res, next) => {
    await signinService(req, res, next);
};
