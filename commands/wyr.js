const wyr = require("../games/wouldyourather")
const ui = require("../utils/ui")

module.exports = {
    name: "wyr",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        const random = wyr[Math.floor(Math.random() * wyr.length)]

        await sock.sendMessage(jid, {
            text: ui.box("🤔 WOULD YOU RATHER", random)
        })
    }
}