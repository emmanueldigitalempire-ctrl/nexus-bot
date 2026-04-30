const { getAIResponse } = require("../utils/ai")
const ui = require("../utils/ui")

module.exports = {
    name: "ai",
    execute: async (sock, msg, args) => {
        const jid = msg.key.remoteJid
        const query = args.join(" ")

        if (!query) {
            return sock.sendMessage(jid, {
                text: ui.error("Ask something. Example: /ai how are you?")
            })
        }

        await sock.sendMessage(jid, {
            text: "🤖 Nexus is thinking..."
        })

        const reply = await getAIResponse(query)

        await sock.sendMessage(jid, {
            text: `🤖 Nexus:\n${reply}`
        })
    }
}