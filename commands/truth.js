const truths = require("../games/truths")
const ui = require("../utils/ui")

module.exports = {
    name: "truth",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        const random = truths[Math.floor(Math.random() * truths.length)]

        await sock.sendMessage(jid, {
            text: ui.game("TRUTH", random)
        })
    }
}