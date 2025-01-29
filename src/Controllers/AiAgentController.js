const { User, AiAgent, userBusinessModel } = require('../Services/DatabaseService');
const GoogleGenerativeAIService = require('../Services/GeminiService');
const bcrypt = require('bcrypt');
const storageServicesInstance = require('../Services/StorageServices');
const aiMotor = new GoogleGenerativeAIService(process.env.GEMINI_API_KEY);

class AiAgentController {

    constructor() {

    }

    static async trainAiAgentFromSavedData(req, res) {

        let { name, message } = req.body;



        const aiAgent = await AiAgent.findOne({
            where: { name: name }
        });
        if (!message) {
            message = `Hello  ${aiAgent.name}`
        }
        const generalContext = `
            Tu te nomme ${aiAgent.name} , un assistant virtuel spécialisé pour ${aiAgent.name} , et son entreprise. 
            Voici une description de toi : ${aiAgent.description}

            Mon entreprise se nomme :  ,  Mon Activité se résume à : DESC_BUSINESS  , 

            Voici les règles que tu dois suivre :
            1. Tu peux parler uniquement des sujets suivants :  ${aiAgent.topics}.
            2. Ton rôle est de [préciser le rôle, par exemple : répondre aux questions sur les produits, guider les utilisateurs, etc.].
            3. Voici quelques informations clés sur notre entreprise :
                - Secteur d'activité : [secteur].
                - Produits/Services principaux : [produits/services].
                - Valeurs de l'entreprise : [valeurs].
            4. Si une question sort de ton périmètre, réponds poliment que tu ne peux pas fournir cette information.
        `;

        let learningResult = await aiMotor.getAIResponse(message, generalContext);
        console.log(learningResult);
        return res.status(201).json({
            success: true,
            response: learningResult,
        });
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