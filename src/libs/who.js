import {jwtVerifyToken, refreshToken} from "./generateToken";
import {findByPk} from "../services/request/generic";
import Model from "../models";
import {createCookie} from "./createCookie";

const {User} = Model;

export const jwtToUser = async (__act, __rt, res, next) => {
    try {
        const decoded = await jwtVerifyToken(__act);
        const freshUser = await findByPk(User, decoded.id);
        if (!freshUser) {
            return undefined
        }
        return freshUser.toJSON();
    } catch (err) {
        const {accessToken, newRefreshToken} = await refreshToken(__rt, next);

        if (accessToken && newRefreshToken) {
            createCookie(
                res,
                accessToken,
                "__act",
                process.env.ACCESS_TOKEN_COOKIE_EXPIRES
            );
            createCookie(
                res,
                newRefreshToken,
                "__rt",
                process.env.REFRESH_TOKEN_COOKIE_EXPIRES
            );
        }

        const decoded = await jwtVerifyToken(accessToken);
        const freshUser = await findByPk(User, decoded.id);
        if (!freshUser) {
            return undefined
        }
        return freshUser.toJSON();
    }
}
