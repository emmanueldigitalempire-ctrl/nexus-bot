module.exports = {
    name: "test",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        await sock.sendMessage(jid, {
            text: "✅ Test command working"
        })
    }
}