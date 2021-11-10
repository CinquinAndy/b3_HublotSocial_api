const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ''
            }
        },
        {}
    )
    Conversation.associate = () => {
// associations can be defined here
    };
    return Conversation;
};
