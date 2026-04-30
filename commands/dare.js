const dares = require("../games/dares")
const ui = require("../utils/ui")

module.exports = {
    name: "dare",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        const random = dares[Math.floor(Math.random() * dares.length)]

        await sock.sendMessage(jid, {
            text: ui.game("DARE", random)
        })
    }
}