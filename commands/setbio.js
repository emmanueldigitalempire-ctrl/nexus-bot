const { setBio } = require("../utils/profile")
const ui = require("../utils/ui")

module.exports = {
    name: "setbio",
    execute: async (sock, msg, args) => {
        const jid = msg.key.remoteJid
        const userId = (msg.key.participant || jid).split(":")[0]

        const bio = args.join(" ")

        if (!bio) {
            return sock.sendMessage(jid, {
                text: ui.error("Use: /setbio Your bio")
            })
        }

        setBio(userId, bio)

        await sock.sendMessage(jid, {
            text: ui.success("Bio updated!")
        })
    }
}