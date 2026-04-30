const { getUser, getTitle } = require("../utils/profile")
const ui = require("../utils/ui")

module.exports = {
    name: "profile",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        const userId = (msg.key.participant || jid).split(":")[0]

        const user = getUser(userId)

        const text = `
👤 Name: ${user.name}
📝 Bio: ${user.bio}

🏆 Level: ${user.level}
🎖️ Title: ${getTitle(user.level)}
`

        await sock.sendMessage(jid, {
            text: ui.box("👤 USER PROFILE", text)
        })
    }
}