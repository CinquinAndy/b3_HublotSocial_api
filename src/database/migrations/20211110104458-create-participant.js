const {v4: uuidv4} = require("uuid");

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Participants', {
            conversation_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                references: {
                    model: 'Conversations',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            user_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
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

    down: queryInterface => queryInterface.dropTable('Participants')
};
