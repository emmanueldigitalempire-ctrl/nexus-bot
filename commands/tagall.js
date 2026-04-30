const { getGroupInfo } = require("../helpers")

module.exports = {
    name: "tagall",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        if (!jid.endsWith("@g.us")) return

        const { participants } = await getGroupInfo(sock, jid)

        let text = "👑 *Tagging everyone:*\n\n"
        const mentions = []

        for (let p of participants) {
            mentions.push(p.id)
            text += `@${p.id.split("@")[0]}\n`
        }

        await sock.sendMessage(jid, { text, mentions })
    }
}