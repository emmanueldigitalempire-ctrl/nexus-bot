module.exports = {
    name: "date",
    execute: async (sock, msg) => {
        const now = new Date()
        const date = now.toLocaleDateString()
        await sock.sendMessage(msg.key.remoteJid, { text: `📅 Current date: ${date}` })
    }
}