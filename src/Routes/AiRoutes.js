const express = require('express');
const GoogleGenerativeAIService = require('../Services/GeminiService');
const router = express.Router();

const aiService = new GoogleGenerativeAIService(process.env.GEMINI_API_KEY);


router.post('/ai-response', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const aiResponse = await aiService.getAIResponse(message);
        res.json({ response: aiResponse });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch AI response' });
    }
});

module.exports = router;