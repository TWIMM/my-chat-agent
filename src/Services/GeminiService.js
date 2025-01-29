const { GoogleGenerativeAI } = require("@google/generative-ai");
const NodeCache = require("node-cache");

// Initialize cache (cache responses for 1 hour)
const cache = new NodeCache({ stdTTL: 3600 });


class GoogleGenerativeAIService {
    constructor(apiKey) {
        this.client = new GoogleGenerativeAI(apiKey);
        this.model = null;
        this.chatSession = null;

    }

    async initializeModel(systemInstruction) {
        try {
            this.model = await this.client.getGenerativeModel({
                model: "gemini-1.5-flash", systemInstruction: systemInstruction,
            });

            this.chatSession = this.model.startChat({ history: [] });

        } catch (error) {
            console.error("Error initializing Google Generative AI model:", error);
            throw error;
        }
    }



    async getAIResponse(prompt, systemInstruction) {
        const cachedResponse = cache.get(prompt);
        if (cachedResponse) {
            console.log("Serving response from cache");
            return cachedResponse;
        }

        if (!this.chatSession) {
            await this.initializeModel(systemInstruction);
        }

        try {
            const result = await this.chatSession.sendMessage(prompt);
            const aiResponse = result.response?.text() || "No response generated.";

            cache.set(prompt, aiResponse);
            return aiResponse;
        } catch (error) {
            console.error("Error generating AI response:", error);
            throw new Error("Failed to generate AI response. Please try again later.");
        }
    }
}

module.exports = GoogleGenerativeAIService;
