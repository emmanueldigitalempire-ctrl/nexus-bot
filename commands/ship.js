const ui = require("../utils/ui")

module.exports = {
    name: "ship",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

        if (!mentioned || mentioned.length < 2) {
            return sock.sendMessage(jid, {
                text: ui.error("Tag two people.\nExample: /ship @user1 @user2")
            })
        }

        const percent = Math.floor(Math.random() * 100)

        const result = `
@${mentioned[0].split("@")[0]} ❤️ @${mentioned[1].split("@")[0]}

Compatibility: *${percent}%*
`

        await sock.sendMessage(jid, {
            text: ui.box("💘 MATCH", result),
            mentions: mentioned
        })
    }
}