import Model from "../models";
import _ from "lodash";
import {findOrCreate} from "./index";
import {hashPassword} from "../libs/passwordOp";
import catchAsync from "../libs/catchAsync";
import {createTokens} from "../libs/generateToken";
import {createCookie} from "../libs/createCookie";

const {User} = Model;

export const signupService = catchAsync(async (req, res, next) => {
    const password = await hashPassword(req.body.password);

    const email = req.body.email.toLowerCase();

    const [user, created] = await findOrCreate(User, {
        ...req.body,
        password,
        email
    });

    if (!created) {
        return res.status(400).json({
            status: "fail",
            message: "user already exist"
        });
    }
    return res.status(201).json({
        status: "success",
        message: "user successfully created",
        payload: _.omit(user.toJSON(), ["password"])
    });
});

export const signinService = catchAsync(async (req, res, next) =>{
    const refreshSecret = process.env.JWT_REFRESH_KEY + req.user.password; // 1
    const [token, refreshToken] = createTokens(
        //2
        {
            id: req.user.id,
            verified: req.user.verified,
            blocked: req.user.blocked,
            role: req.user.role
        },
        refreshSecret
    );
    const payload = {...req.user, token, refreshToken};
    createCookie(res, token, "__act", process.env.JWT_ACCESS_TOKEN_EXPIRES);
    createCookie(
        // 3
        res,
        refreshToken,
        "__rt",
        process.env.JWT_REFRESH_TOKEN_EXPIRES
    );
    return res.status(200).json({
        status: "success",
        message: "Login successfully",
        payload: _.omit(payload, ["password"])
    });
})
