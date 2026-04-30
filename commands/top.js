const { getTop } = require("../utils/level")
const ui = require("../utils/ui")

module.exports = {
    name: "top",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        const top = getTop(jid)

        if (!top.length) {
            return sock.sendMessage(jid, {
                text: ui.error("No leaderboard data yet.")
            })
        }

        let text = ""

        top.forEach(([user, data], i) => {
            text += `${i + 1}. @${user.split("@")[0]} — Level ${data.level}\n`
        })

        await sock.sendMessage(jid, {
            text: ui.box("🏆 LEADERBOARD", text),
            mentions: top.map(x => x[0])
        })
    }
}