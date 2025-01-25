const { DataTypes } = require('sequelize');
const { sequelize } = require('../Services/DatabaseService'); // Import the sequelize instance

// Define the User model
const User = sequelize.define(
    'User',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user',
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt
    }
);



module.exports = User;
