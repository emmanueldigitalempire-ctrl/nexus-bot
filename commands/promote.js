const { getGroupInfo, isAdmin } = require("../helpers")

module.exports = {
    name: "promote",
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

        const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid
        if (!mentioned || !mentioned.length)
            return sock.sendMessage(jid, { text: "❌ Tag a user to promote." })

        await sock.groupParticipantsUpdate(jid, mentioned, "promote")
    }
}