const { getGroupInfo, isAdmin } = require("../helpers")

module.exports = {
    name: "ban",
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

        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
        if (!mentioned || mentioned.length === 0)
            return sock.sendMessage(jid, { text: "❌ Mention a user to ban. Usage: /ban @user" })

        const user = mentioned[0]
        await sock.groupParticipantsUpdate(jid, [user], "remove")
        await sock.sendMessage(jid, { text: `🚫 @${user.split("@")[0]} has been banned from the group!`, mentions: [user] })
    }
}