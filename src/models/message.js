const {Model} = require('sequelize');

const {Conversation} = Model;
const {User} = Model;

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: uuidv4(),
                allowNull: false,
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
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Conversations',
                    key: 'id'
                },
            },
            id_user: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
            }
        },
        {}
    )

    Message.hasOne(Conversation)
    Message.hasOne(User)
    Message.associate = () => {
// associations can be defined here
    };
    return Message;
};
