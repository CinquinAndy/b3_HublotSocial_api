import { v4 as uuidv4 } from 'uuid';

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Messages', {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: uuidv4(),
                allowNull: false,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date(Date.now())
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ''
            },
            id_conversation: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Conversations',
                    key: 'id'
                },
            },
            id_user: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    ,
    down: queryInterface => queryInterface.dropTable('Messages')
};
