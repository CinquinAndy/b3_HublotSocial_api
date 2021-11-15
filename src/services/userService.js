import _ from "lodash";
import catchAsync from "../libs/catchAsync";
import Model from "../models";
import {jwtToUser} from "../libs/who";
import {findUser} from "./request/user";
import {findAll, findByPk} from "./request/generic";

const {User} = Model;

export const userService_getAllUsers = catchAsync(async (req, res, next) => {
    const users = await findAll(User);
    const body = users.map(user => _.omit(user.toJSON(), ["password", "changedPassword", "createdAt", "updatedAt"]));

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const userService_getUser = catchAsync(async (req, res, next) => {
    const user_email = req.params['user_email'];
    const user = await findUser(User, user_email);
    const body = _.omit(user.toJSON(), ["password", "changedPassword", "createdAt", "updatedAt"]);

    if (_.isEmpty(user)) {
        return res.status(400).json({
            status: "The user does not exist"
        });
    }

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const userService_getMe = catchAsync(async (req, res, next) => {
    const actualUser = await jwtToUser(req.cookies.__act, req.cookies.__rt, res, next);

    const user_email = actualUser['email'];
    const user = await findUser(User, user_email);
    const body = _.omit(user.toJSON(), ["password", "changedPassword", "createdAt", "updatedAt"]);

    if (_.isEmpty(user)) {
        return res.status(400).json({
            status: "The user does not exist"
        });
    }

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const userService_patchMe = catchAsync(async (req, res, next) => {
    const actualUser = await jwtToUser(req.cookies.__act, req.cookies.__rt, res, next);

    const user_email = actualUser['email'];
    const user = await findUser(User, user_email);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.photo = req.body.photo;
    await user.save();
    const body = _.omit(user.toJSON(), ["password", "changedPassword", "createdAt", "updatedAt"]);

    if (_.isEmpty(user)) {
        return res.status(400).json({
            status: "The user does not exist"
        });
    }

    return res.status(200).json({
        status: "success",
        payload: body
    });
})

export const userService_deleteFromEmail = catchAsync(async (req, res, next) => {
    const user_email = req.params['user_email'];
    const user = await findUser(User, user_email);
    await user.destroy();

    if (_.isEmpty(user)) {
        return res.status(400).json({
            status: "The user does not exist"
        });
    }

    return res.status(200).json({
        status: "success - deleted",
    });
})

export const userService_deleteFromId = catchAsync(async (req, res, next) => {
    const id_user = req.params['id_user'];
    const user = await findByPk(User, id_user);
    await user.destroy();

    if (_.isEmpty(user)) {
        return res.status(400).json({
            status: "The user does not exist"
        });
    }

    return res.status(200).json({
        status: "success - deleted",
    });
})

