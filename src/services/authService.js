import Model from "../models";
import _ from "lodash";
import {hashPassword} from "../libs/passwordOp";
import catchAsync from "../libs/catchAsync";
import {createTokens} from "../libs/generateToken";
import {createCookie} from "../libs/createCookie";
import {createUser, findUser} from "./request/user";
import {toJSON} from "lodash/seq";
import {v4 as uuidv4} from "uuid";

const {User} = Model;

export const signupService = catchAsync(async (req, res, next) => {
    const password = await hashPassword(req.body.password);
    const email = req.body.email.toLowerCase()
    const userFinded = await findUser(User, email)

    if (!userFinded) {
        const created = await createUser(User, {
            id:uuidv4(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email.toLowerCase(),
            password: password
        });
        if (!created) {
            return res.status(400).json({
                status: "fail",
                message: "error on creating user",
            });
        } else{
            return res.status(201).json({
                status: "success",
                message: "user successfully created",
                payload: _.omit(JSON.parse(JSON.stringify(created)), ["password", "changedPassword", "createdAt", "updatedAt"])
            });
        }
    }

    return res.status(400).json({
        status: "fail",
        message: "user already exist"
    });
});

export const signinService = catchAsync(async (req, res, next) => {
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
