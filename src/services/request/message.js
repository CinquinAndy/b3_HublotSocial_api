import {Op} from "sequelize";
import {v4 as uuidv4} from "uuid";
import Model from "../../models";

const {User} = Model;
export const findMessage = (model) => model.findAll({
    include: [
        {
            model: User,
            as: "Users",
            required:true,
            attributes: ["firstName", "lastName", "email"],
        }
    ],
})

export const findMessageUser = (model, id) => model.findAll({
    where: {
        id_user: id
    },
    include: [
        {
            model: User,
            as: "Users",
            required:true,
            attributes: ["firstName", "lastName", "email"],
        }
    ],
})

export const findMessageUserAndConversation = (model, payload) => model.findAll({
    where: {
        [Op.and]: [
            {
                id_user: payload.id_user
            },
            {
                id_conversation: payload.id_conversation
            }
        ]
    },
    include: [
        {
            model: User,
            as: "Users",
            required:true,
            attributes: ["firstName", "lastName", "email"],
        }
    ],
})

export const findMessageConversation = (model, id) => model.findAll({
    where: {
        id_conversation: id
    },
    include: [
        {
            model: User,
            as: "Users",
            required:true,
            attributes: ["firstName", "lastName", "email"],
        }
    ],

})

export const createMessage = (model, payload) => model.create({
    id: uuidv4(),
    content: payload.content,
    id_conversation: payload.id_conversation,
    id_user: payload.id_user
})


export const updateMessage = (model, payload) => model.update({
    content: payload.content,
    // id_conversation:payload.id_conversation,
    // id_user:payload.id_user
}, {
    where: {
        id: payload.id
    }
})
