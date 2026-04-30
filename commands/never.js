const never = require("../games/never")
const ui = require("../utils/ui")

module.exports = {
    name: "never",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        const random = never[Math.floor(Math.random() * never.length)]

        await sock.sendMessage(jid, {
            text: ui.box("😈 NEVER HAVE I EVER", random)
        })
    }
}