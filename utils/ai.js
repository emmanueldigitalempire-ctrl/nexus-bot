const axios = require("axios")

async function getAIResponse(prompt) {
    try {
        const res = await axios.get(
            `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(prompt)}`
        )

        return res.data.message
    } catch (err) {
        return "AI offline."
    }
}

module.exports = { getAIResponse }