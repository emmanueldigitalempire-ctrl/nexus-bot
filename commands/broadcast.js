module.exports = {
    name: "broadcast",
    execute: async (sock, msg) => {
        const sender = msg.key.participant || msg.key.remoteJid
        const botId = sock.user.id.split(":")[0] + "@s.whatsapp.net"
        if (sender !== botId) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." })

        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ""
        const message = text.replace("/broadcast", "").trim()
        if (!message) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a message to broadcast." })

        // For simplicity, broadcast to current chat
        await sock.sendMessage(msg.key.remoteJid, { text: `📢 Broadcast: ${message}` })
    }
}