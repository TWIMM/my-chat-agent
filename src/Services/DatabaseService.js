const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
});

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

class DatabaseService {
    constructor() { }

    // Connect to the database
    async connectToDB() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');

            // Sync models with the database, and ensure associations are set up
            await sequelize.sync({ alter: true }); // alter: true to avoid dropping tables
            console.log('Models synced with the database');


        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

}

// Export both the sequelize instance and the DatabaseService class
module.exports = { sequelize, DatabaseService };
