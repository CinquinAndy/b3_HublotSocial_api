import {Op} from "sequelize";

/**
 * From id_user
 * @param model
 * @param id
 * @returns {Promise<Model[]>}
 */
export const findParticipantsUser = (model, id) => model.findAll({
    where: {
        id_user: id
    },
});

/**
 * Find or create on participants [id_conversation & id_user]
 * @param model
 * @param payload
 * @returns {Promise<[Model, boolean]>}
 */
export const findOrCreateParticipantsBoth = (model, payload) =>
    model.findOrCreate({
        where: {
            [Op.and]: [
                {id_conversation: payload['id_conversation']},
                {id_user: payload['id_user']},
            ]
        },
        defaults: {
            ...payload
        }
    })
