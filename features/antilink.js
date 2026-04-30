const fs = require("fs")

module.exports = async (sock, msg) => {
    const jid = msg.key.remoteJid

    if (!jid.endsWith("@g.us")) return

    const text =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text

    if (!text) return

    let data = {}
    try {
        data = JSON.parse(fs.readFileSync("./antilink.json"))
    } catch {
        data = {}
    }

    if (!data[jid]) return

    const isLink = text.includes("http") || text.includes("chat.whatsapp.com")

    if (isLink) {
        await sock.sendMessage(jid, {
            text: "🚫 Links are not allowed here."
        })

        try {
            await sock.sendMessage(jid, {
                delete: msg.key
            })
        } catch {}
    }
}