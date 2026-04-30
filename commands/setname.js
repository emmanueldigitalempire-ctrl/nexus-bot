const { setName } = require("../utils/profile")
const ui = require("../utils/ui")

module.exports = {
    name: "setname",
    execute: async (sock, msg, args) => {
        const jid = msg.key.remoteJid
        const userId = (msg.key.participant || jid).split(":")[0]

        const name = args.join(" ")

        if (!name) {
            return sock.sendMessage(jid, {
                text: ui.error("Use: /setname YourName")
            })
        }

        setName(userId, name)

        await sock.sendMessage(jid, {
            text: ui.success("Name updated!")
        })
    }
}