const {Model} = require('sequelize');

const {User} = Model;
const {Conversation} = Model;

module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant',
        {
            id_conversation: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Conversations',
                    key: 'id'
                },
            },
            id_user: {
                primaryKey: true,
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
            },
        },
        {}
    )

    Conversation.belongsToMany(User, {through:'Participants'})
    User.belongsToMany(Conversation, {through:'Participants'})
    Participant.associate = () => {
// associations can be defined here
    };
    return Participant;
};
