import Model from "../models";
const {v4: uuidv4} = require("uuid");

// const {Conversation} = Model;
// const {User} = Model;

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: uuidv4(),
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(Date.now())
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ''
            },
            id_conversation: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'Conversations',
                    key: 'id'
                },
            },
            id_user: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
            }
        },
        {}
    )


    Message.associate = () => {
// associations can be defined here
//         Message.hasOne(Conversation)
//         Message.hasOne(User)
    };
    return Message;
};
