import { v4 as uuidv4 } from 'uuid';

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: uuidv4()
            },
            firstName: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            lastName: {
                type: Sequelize.STRING
            },
            photo: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.INTEGER
            },
            verified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            blocked: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            changedPassword: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        }),
    down: queryInterface => queryInterface.dropTable('Users')
};
