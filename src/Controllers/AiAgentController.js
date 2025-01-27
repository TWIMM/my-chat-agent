const { User, AiAgent, userBusinessModel } = require('../Services/DatabaseService');
const GoogleGenerativeAIService = require('../Services/GeminiService');
const bcrypt = require('bcrypt');
const storageServicesInstance = require('../Services/StorageServices');


class AiAgentController {

    constructor() {

    }

    static async trainAiAgent() {

    }


    static async getAiAgentListByUser(req, res) {
        try {

            const email = await storageServicesInstance.getStorageVar('user_key');

            const user = await User.findOne({
                where: { email: email },
                include: [
                    { model: AiAgent, as: "AiAgent" }
                ]
            });

            //const aiAgentListByUser = await AiAgent.findAll({});
            console.log(user.AiAgent);
            return res.status(201).json({
                success: true,
                message: 'ia Agent List!',
                AiAgent: user.AiAgent
            });



        } catch (error) {
            console.log(error);
        }
    }

    static async getSpecificAiAgent(req, res) {
        try {

            //const email = await storageServicesInstance.getStorageVar('user_key');

            /* const user = await User.findOne({
                where: { email: email },
                include: [
                    { model: AiAgent, as: "AiAgent" }
                ]
            }); */

            const { name } = req.body;

            const aiAgentListByUser = await AiAgent.findOne({
                where: { name: name }
            });
            console.log(aiAgentListByUser);
            return res.status(201).json({
                success: true,
                message: 'ia Agent !',
                AiAgent: aiAgentListByUser
            });



        } catch (error) {
            console.log(error);
        }
    }

    static async createAiAgent(req, res) {

        const { name, description, topics } = req.body;

        if (!name || !description || !topics) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const email = await storageServicesInstance.getStorageVar('user_key');

        const aiAgent = await AiAgent.findOne({ where: { name } });
        const user = await User.findOne({ where: { email } });


        if (aiAgent) {
            return res.status(400).json({ success: false, message: 'Ai agent with this name already exits.' });
        }
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found .' });
        }

        let randomString = "";
        const car = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvw0123456789";

        for (let i = 0; i < 10; i++) {
            randomString += car.charAt(Math.floor(Math.random() * car.length));
        }

        const aiId = await bcrypt.hash(randomString, 10);

        const newAiAgent = await AiAgent.create({
            name,
            topics,
            description,
            userId: user.id,

            aiId: aiId,
        });

        return res.status(201).json({
            success: true,
            message: 'newAiAgent registered successfully!',
            AiAgent: {
                id: newAiAgent.id,
                name: newAiAgent.name,
                description: newAiAgent.description,
                topics: newAiAgent.topics,
            }
        });
    }

    static async updateAiAgent(req, res) {
        const { name, description, topics, aiId } = req.body;

        if (!name || !description || !topics || !aiId) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const email = await storageServicesInstance.getStorageVar('user_key');

        const aiAgent = await AiAgent.findOne({ where: { aiId: aiId } });
        const user = await User.findOne({ where: { email } });


        if (!aiAgent) {
            return res.status(400).json({ success: false, message: 'Ai agent not found.' });
        }
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found .' });
        }

        /*  let randomString = "";
         const car = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvw0123456789";
 
         for (let i = 0; i < 10; i++) {
             randomString += car.charAt(Math.floor(Math.random() * car.length));
         } */

        // const aiId = await bcrypt.hash(randomString, 10);

        const aiAgentUpdated = await AiAgent.update({
            name,
            topics,
            description,
            //userId: user.id,

            // aiId: aiId,
        }, {
            where: { aiId: aiId }
        });

        return res.status(201).json({
            success: true,
            message: 'newAiAgent registered successfully!',
            AiAgent: {
                id: aiAgentUpdated.id,
                name: aiAgentUpdated.name,
                description: aiAgentUpdated.description,
                topics: aiAgentUpdated.topics,
            }
        });
    }

    static async delAiAgent(req, res) {
        try {
            const { aiId } = req.body;
            const aiAgentUpdated = await AiAgent.destroy({
                where: { aiId: aiId }
            });

            return res.status(201).json({
                success: true,
                message: 'newAiAgent deleted successfully!',

            });
        } catch (error) {

        }
    }

}

module.exports = AiAgentController; 