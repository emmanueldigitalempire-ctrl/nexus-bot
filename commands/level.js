const { getUser } = require("../utils/level")
const ui = require("../utils/ui")

module.exports = {
    name: "level",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        const user =
            msg.key.participant ||
            msg.key.remoteJid

        const data = getUser(user, jid)

        if (!data) {
            return sock.sendMessage(jid, {
                text: ui.error("No level data yet. Start chatting!")
            })
        }

        const text = `
Level: ${data.level}
XP: ${data.xp}
`

        await sock.sendMessage(jid, {
            text: ui.box("🏆 YOUR LEVEL", text)
        })
    }
}