module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Participants', {
            id_conversation: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Conversations',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            id_user: {
                primaryKey: true,
                type: Sequelize.UUID,
                allowNull: false,
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
