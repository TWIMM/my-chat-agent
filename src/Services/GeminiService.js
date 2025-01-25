const { GoogleGenerativeAI } = require("@google/generative-ai");
const NodeCache = require("node-cache");

// Initialize cache (cache responses for 1 hour)
const cache = new NodeCache({ stdTTL: 3600 });

class GoogleGenerativeAIService {
    constructor(apiKey) {
        this.client = new GoogleGenerativeAI(apiKey);
        this.model = null;
    }

    async initializeModel() {
        try {
            this.model = await this.client.getGenerativeModel({ model: "gemini-1.5-flash" });
        } catch (error) {
            console.error("Error initializing Google Generative AI model:", error);
            throw error;
        }
    }

    async getAIResponse(prompt) {
        // Check cache for existing response
        const cachedResponse = cache.get(prompt);
        if (cachedResponse) {
            console.log("Serving response from cache");
            return cachedResponse;
        }

        // Ensure model is initialized
        if (!this.model) {
            await this.initializeModel();
        }

        try {
            // Generate content using the model
            const result = await this.model.generateContent(prompt);
            const aiResponse = result.response?.text() || "No response generated.";

            // Cache the response for future use
            cache.set(prompt, aiResponse);
            return aiResponse;
        } catch (error) {
            console.error("Error generating AI response:", error);
            throw new Error("Failed to generate AI response. Please try again later.");
        }
    }
}

module.exports = GoogleGenerativeAIService;
