const { getGroupInfo, isAdmin } = require("../helpers")
const fs = require("fs").promises

async function loadWarnings() {
    try {
        const data = await fs.readFile("./data/warnings.json", "utf8")
        return JSON.parse(data)
    } catch {
        return {}
    }
}

async function saveWarnings(data) {
    await fs.writeFile("./data/warnings.json", JSON.stringify(data, null, 2))
}

module.exports = {
    name: "clearwarn",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        if (!jid.endsWith("@g.us")) return

        const { participants } = await getGroupInfo(sock, jid)

        const sender = msg.key.participant || msg.key.remoteJid

        if (!isAdmin(participants, sender))
            return sock.sendMessage(jid, { text: "❌ You must be admin." })

        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
        if (!mentioned || mentioned.length === 0)
            return sock.sendMessage(jid, { text: "❌ Mention a user to clear warnings. Usage: /clearwarn @user" })

        const user = mentioned[0]
        const warnings = await loadWarnings()
        const userKey = `${jid}:${user}`
        if (warnings[userKey]) {
            delete warnings[userKey]
            await saveWarnings(warnings)
            await sock.sendMessage(jid, { text: `✅ Warnings cleared for @${user.split("@")[0]}.`, mentions: [user] })
        } else {
            await sock.sendMessage(jid, { text: `ℹ️ @${user.split("@")[0]} has no warnings.`, mentions: [user] })
        }
    }
}