/**
 * Find or create user ( where email )
 * @param model
 * @param payload
 * @returns {Promise<[Model, boolean]>}
 */
export const createUser = (model, payload) =>
    model.create({
        id:payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password
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
        }
    });
