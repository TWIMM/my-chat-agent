const { DataTypes } = require('sequelize');
const { sequelize } = require('../Services/DatabaseService'); // Import the sequelize instance
const User = require('./User'); // Import the User model

// Define the AiAgent model
const AiAgent = sequelize.define(
    'AiAgent',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        topics: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        aiId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt
    }
);

// Define associations
User.hasMany(AiAgent, {
    foreignKey: 'userId', // Foreign key in AiAgent
    onDelete: 'CASCADE', // Delete agents when the user is deleted
});
AiAgent.belongsTo(User, {
    foreignKey: 'userId', // Foreign key in AiAgent
});

module.exports = AiAgent;
