const { getGroupInfo, isAdmin } = require("../helpers")

module.exports = {
    name: "setdesc",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        if (!jid.endsWith("@g.us")) return

        const { participants } = await getGroupInfo(sock, jid)

        const sender = msg.key.participant || msg.key.remoteJid
        const botId = sock.user.id.split(":")[0] + "@s.whatsapp.net"

        if (!isAdmin(participants, sender))
            return sock.sendMessage(jid, { text: "❌ You must be admin." })

        if (!isAdmin(participants, botId))
            return sock.sendMessage(jid, { text: "❌ Bot is not admin." })

        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ""
        const desc = text.replace("/setdesc", "").trim()
        if (!desc) return sock.sendMessage(jid, { text: "❌ Provide a description. Usage: /setdesc [description]" })

        await sock.groupUpdateDescription(jid, desc)
        await sock.sendMessage(jid, { text: "📝 Group description updated." })
    }
}