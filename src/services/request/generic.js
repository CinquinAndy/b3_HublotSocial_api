/**
 * Find by PK
 * @param model
 * @param id
 * @returns {Promise<Model> | Promise<Model | null>}
 */
export const findByPk = (model, id) => model.findByPk(id);

/**
 * Find all
 * @param model
 * @returns {Promise<Model[]>}
 */
export const findAll = model => model.findAll();

/**
 * Delete specific element
 * @param model
 * @param id
 */
export const deleteElement = (model, id) => model.delete({
    where:{
        id:id
    }
})
