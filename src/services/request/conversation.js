import * as model from "../../models";

const db = require("../../models");

const {User} = model;
const {Conversation} = model;
const {Participant} = model;

/**
 * From title
 * @param model
 * @param title
 * @returns {Promise<Model[]>}
 */
export const findFromTitleConversation = (model, title) => model.findAll({
    where: {
        title: title
    }
});

/**
 * From Id_conversation
 * @param model
 * @param id
 * @returns {Promise<Model[]>}
 */
export const findFromIdConversation = (model, id) => model.findAll({
    where: {
        id_conversation: id
    },
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
                as: "users",
                attributes: ["firstName", "lastName", "email"],
                through: {
                    attributes: []
                }
            }
        ],
        where: {
            id_user: id_user
        }
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
        include: {
            model: Participant,
            include: [
                {
                    model: User,
                    through: {attributes: []}
                }
            ]
        },
        defaults: {
            ...payload
        }
    })

export const addUserToConversation = (payload) =>
    Conversation.findByPk(payload.conversation_id)
        .then((finded) => {
            return User.findByPk(payload.user_id).then((user) => {
                if (!user) {
                    console.log("user not found");
                    return null;
                }
                Participant.create([
                    {id_user: payload.user_id, id_conversation: payload.conversation_id}
                ])
            })
        }).catch((err) => {
        console.log("Error while adding user to conversation")
    })

export const addConversation = (model, payload) => model.create({
    title:payload.title
})

