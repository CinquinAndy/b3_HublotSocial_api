export const findOrCreate = (model, payload) =>
    model.findOrCreate({
        where: {email: payload.email},
        defaults: {
            ...payload
        }
    });

export const findUser = (model, payload) =>
    model.findOne({
        where: {
            email: payload
        },
        logging: false
    });

export const findByPk = (model, id) => model.findByPk(id);

export const findAll = model => model.findAll();

export const findParticipantsConversation = (model, id) => model.findAll({
    where: {
        id_conversation: id
    },
})

export const findParticipantsUser = (model, id) => model.findAll({
    where: {
        id_user: id
    },
});
