/**
 * Find or create user ( where email )
 * @param model
 * @param payload
 * @returns {Promise<[Model, boolean]>}
 */
export const findOrCreateUser = (model, payload) =>
    model.findOrCreate({
        where: {email: payload.email},
        defaults: {
            ...payload
        }
    });

/**
 * Find user by email
 * @param model
 * @param email
 * @returns {Promise<Model> | Promise<Model | null>}
 */
export const findUser = (model, email) =>
    model.findOne({
        where: {
            email: email
        },
        logging: false
    });
