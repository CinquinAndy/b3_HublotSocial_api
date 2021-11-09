import Model from "../models";
import _ from "lodash";
import {findOrCreate} from "./index";
import {hashPassword} from "../libs/passwordOp";
import catchAsync from "../libs/catchAsync";

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
