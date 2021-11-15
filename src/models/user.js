import Model from "../models";

import {v4 as uuidv4} from 'uuid';

// const {Message} = Model;

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: uuidv4()
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            photo: {
                type: DataTypes.STRING,
                allowNull: true
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            verified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            blocked: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            changedPassword: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {}
    );
    User.associate = ({Message,Conversation}) => {
// associations can be defined here
        User.belongsToMany(Conversation, {through: 'Participants', foreignKey: "id_user"})

    };
    return User;
};
