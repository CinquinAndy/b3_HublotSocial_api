import { v4 as uuidv4 } from 'uuid';

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Conversations', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: uuidv4(),
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ''
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }),
    down: queryInterface => queryInterface.dropTable('Conversations')

};
