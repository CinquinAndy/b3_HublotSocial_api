const {Op} = require("sequelize");
import Model from "../../models";
import {v4 as uuidv4} from "uuid";

const {User} = Model;
const {Conversation} = Model;
const {Participant} = Model;

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
                as: "Users",
                attributes: ["firstName", "lastName", "email"],
                through: {
                    attributes: []
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

export const addUserToConversation = (model, payload) =>
    Participant.create(
        {user_id: payload.user_id, conversation_id: payload.conversation_id}
    )

export const findByBoth = (model, payload) =>
    model.findAll({
        where:{
            [Op.and]: [
                { user_id: payload.user_id },
                { conversation_id: payload.conversation_id }
            ]
        }
    })
//     .then((finded) => {
//         return User.findByPk(payload.user_id).then((user) => {
//             if (!user) {
//                 console.log("user not found");
//                 return null;
//             }
//             Participant.create([
//                 {id_user: payload.user_id, id_conversation: payload.conversation_id}
//             ])
//         })
//     }).catch((err) => {
//     console.log("Error while adding user to conversation")
// })
// model.findOrCreate({
//     where: {
//          [Op.and]: [
//             {'$Participant.user_id' : payload.user_id},
//             {'$Participant.conversation_id' : payload.conversation_id},
//         ]
//     },
//     include: {
//         model: Participant,
//         include: [
//             {
//                 model: User,
//                 through: {attributes: []}
//             }
//         ]
//     },
//     defaults: {
//         user_id: payload.user_id,
//         conversation_id: payload.conversation_id
//     }
// })


export const addConversation = (model, payload) => model.create({
    id: uuidv4(),
    title: payload.title
})

