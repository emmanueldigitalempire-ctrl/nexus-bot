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

module.exports = {
    name: "warnings",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        if (!jid.endsWith("@g.us")) return

        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
        if (!mentioned || mentioned.length === 0)
            return sock.sendMessage(jid, { text: "❌ Mention a user to check warnings. Usage: /warnings @user" })

        const user = mentioned[0]
        const warnings = await loadWarnings()
        const userKey = `${jid}:${user}`
        const warnCount = warnings[userKey] || 0
        await sock.sendMessage(jid, { text: `⚠️ @${user.split("@")[0]} has ${warnCount} warnings.`, mentions: [user] })
    }
}