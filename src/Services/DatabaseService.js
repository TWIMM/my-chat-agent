const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
});

const Produit = sequelize.define(
    "Produit",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }
);

// Define the User model
const User = sequelize.define(
    'User',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        facebook: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        instagram: {
            type: DataTypes.STRING,
            allowNull: true,
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


const userBusinessModel = sequelize.define(
    'userBusinessModel',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        linkOfBusiness: {
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
        businessId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);



// Define associations
User.hasMany(AiAgent, {
    foreignKey: 'userId', // Foreign key in AiAgent
    onDelete: 'CASCADE',
    as: "AiAgent"// Delete agents when the user is deleted
});
User.hasMany(userBusinessModel, {
    foreignKey: 'userId', // Foreign key in AiAgent
    onDelete: 'CASCADE',
    as: "userBusinessModel"// Delete agents when the user is deleted
});


userBusinessModel.hasMany(
    Produit, {
    foreignKey: 'businessModelId', // Foreign key in AiAgent
    as: "Produit"// Delete agents when the user is deleted
}
)

Produit.belongsTo(userBusinessModel, {
    foreignKey: 'businessModelId',
    as: "User"// Foreign key in AiAgent
});

userBusinessModel.belongsTo(User, {
    foreignKey: 'userId', // Foreign key in AiAgent
});


AiAgent.belongsTo(User, {
    foreignKey: 'userId',
    as: "User"// Foreign key in AiAgent
});


userBusinessModel.hasOne(AiAgent, {
    foreignKey: 'businessModelId', // The foreign key in the AIAgent table
    as: 'AiAgent', // Alias for the relationship
});

AiAgent.belongsTo(userBusinessModel, {
    foreignKey: 'businessModelId', // The foreign key in the AIAgent table
    as: 'businessModel', // Alias for the reverse relationship
});


class DatabaseService {
    constructor() { }

    // Connect to the database
    async connectToDB() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');

            //Sync models with the database, and ensure associations are set up
            await sequelize.sync({ alter: true }); // alter: true to avoid dropping tables
            console.log('Models synced with the database');


        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

}

// Export both the sequelize instance and the DatabaseService class
module.exports = { sequelize, DatabaseService, User, AiAgent, userBusinessModel };
