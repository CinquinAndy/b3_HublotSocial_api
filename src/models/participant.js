module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant',
        {
            id_conversation: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                references: {
                    model: 'Conversations',
                    key: 'id'
                },
            },
            id_user: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
            },
        },
        {}
    )


    Participant.associate = ({Conversation,User}) => {
        // associations can be defined here
        Conversation.belongsToMany(User, {through: 'Participants', foreignKey: "conversation_id"})
        User.belongsToMany(Conversation, {through: 'Participants', foreignKey: "user_id"})
    }
    return Participant;
};
