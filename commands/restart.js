module.exports = {
    name: "restart",
    execute: async (sock, msg) => {
        const sender = msg.key.participant || msg.key.remoteJid
        const botId = sock.user.id.split(":")[0] + "@s.whatsapp.net"
        if (sender !== botId) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Owner only." })

        await sock.sendMessage(msg.key.remoteJid, { text: "🔄 Restarting bot..." })
        process.exit(0)
    }
}