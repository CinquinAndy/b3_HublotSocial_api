import Model from "../models";

const {v4: uuidv4} = require("uuid");

// const {Message} = Model;

module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: uuidv4(),
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ''
            }
        },
        {}
    )
    Conversation.associate = ({Message,User}) => {
// associations can be defined here
        Conversation.belongsToMany(User, {through: 'Participants', foreignKey: "conversation_id"})
        Conversation.hasMany(Message, {as: 'Message', foreignKey: 'conversation_id'})
    };
    return Conversation;
};
