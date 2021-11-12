const {v4: uuidv4} = require("uuid");
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Participants', {
            id_conversation: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                references: {
                    model: 'Conversations',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            id_user: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
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
