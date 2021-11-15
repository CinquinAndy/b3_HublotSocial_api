const {Op} = require("sequelize");
import Model from "../../models";
import {v4 as uuidv4} from "uuid";

const {User} = Model;
const {Conversation} = Model;
const {Participant} = Model;


export const findAllConversation = (model) => model.findAll({
    include: [
        {
            model: User,
            as: "Users",
            attributes: ["firstName", "lastName", "email"],
            through: {
                attributes: []
            },
        }
    ],
})
/**
 * From title
 * @param model
 * @param title
 * @returns {Promise<Model[]>}
 */
export const findFromTitleConversation = (model, title) => model.findAll({
    where: {
        title: title
    },
    include: [
        {
            model: User,
            as: "Users",
            attributes: ["firstName", "lastName", "email"],
            through: {
                attributes: []
            }
        }
    ],
});

/**
 * From Id_conversation
 * @param model
 * @param id
 * @returns {Promise<Model[]>}
 */
export const findFromIdConversation = (model, id) => model.findAll({
    where: {
        id: id
    },
    include: [
        {
            model: User,
            as: "Users",
            attributes: ["firstName", "lastName", "email"],
            through: {
                attributes: []
            }
        }
    ],
})

/**
 * Find all from id_user
 * @param model
 * @param id_user
 */
export const findAllConversationsFromUser = (model, id_user) =>
    model.findAll({
        include: [
            {
                model: User,
                as: "Users",
                attributes: ["firstName", "lastName", "email", "id"],
                through: {
                    attributes: []
                },

                where: {
                    id: id_user
                    // [Op.or]: [
                    //     {id: id_user},
                    //     {
                    //         id: {
                    //             [Op.col]: "Users.id"
                    //         }
                    //     }
                    // ]
                }
            }
        ],
    })

/**
 * Find or create a new conversation
 * @param model
 * @param payload
 * @returns {Promise<[Model, boolean]>}
 */
export const findOrCreateConversation = (model, payload) =>
    model.findOrCreate({
        where: {
            id: payload.id_conversation
        },
        include: [
            {
                model: User,
                as: "Users",
                attributes: ["firstName", "lastName", "email"],
                through: {
                    attributes: []
                }
            }
        ],
        defaults: {
            ...payload
        }
    })

export const addUserToConversation = (model, payload) =>
    Participant.create(
        {id_user: payload.id_user, id_conversation: payload.id_conversation}
    )

export const findByBoth = (model, payload) =>
    model.findAll({
        where: {
            [Op.and]: [
                {id_user: payload.id_user},
                {id_conversation: payload.id_conversation}
            ]
        }
    })

export const addConversation = (model, payload) => model.create({
    id: uuidv4(),
    title: payload.title
})

