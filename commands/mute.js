module.exports = {
    name: "mute",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(jid, {
                text: "❌ Group only command."
            })
        }

        const meta = await sock.groupMetadata(jid)
        const participants = meta.participants

        const botNumber = sock.user.id.split("@")[0].split(":")[0]

        console.log("BOT:", botNumber)
        console.log("PARTICIPANTS:", participants)

        // 🔥 FINAL ADMIN CHECK (LID + PHONE SAFE)
        const isBotAdmin = participants.some(p => {
            const idNum = p.id?.split("@")[0]?.split(":")[0]
            const phoneNum = p.phoneNumber?.split("@")[0]

            return (
                (idNum === botNumber || phoneNum === botNumber) &&
                (p.admin === "admin" || p.admin === "superadmin")
            )
        })

        if (!isBotAdmin) {
            return sock.sendMessage(jid, {
                text: "❌ Bot is not detected as admin."
            })
        }

        await sock.groupSettingUpdate(jid, "announcement")

        await sock.sendMessage(jid, {
            text: "🔇 Group muted successfully."
        })
    }
}