module.exports = {
    name: "time",
    execute: async (sock, msg) => {
        const now = new Date()
        const time = now.toLocaleTimeString()
        await sock.sendMessage(msg.key.remoteJid, { text: `🕒 Current time: ${time}` })
    }
}