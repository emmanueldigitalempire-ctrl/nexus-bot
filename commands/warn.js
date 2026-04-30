const fs = require("fs")

module.exports = {
    name: "warn",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        const user = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]

        if (!user) {
            return sock.sendMessage(jid, { text: "Tag a user to warn." })
        }

        let data = {}
        try { data = JSON.parse(fs.readFileSync("./warns.json")) } catch {}

        if (!data[jid]) data[jid] = {}
        if (!data[jid][user]) data[jid][user] = 0

        data[jid][user]++

        fs.writeFileSync("./warns.json", JSON.stringify(data, null, 2))

        if (data[jid][user] >= 3) {
            await sock.groupParticipantsUpdate(jid, [user], "remove")
            delete data[jid][user]
            fs.writeFileSync("./warns.json", JSON.stringify(data, null, 2))

            return sock.sendMessage(jid, {
                text: "🚫 User removed after 3 warnings."
            })
        }

        sock.sendMessage(jid, {
            text: `⚠️ Warning ${data[jid][user]}/3`
        })
    }
}