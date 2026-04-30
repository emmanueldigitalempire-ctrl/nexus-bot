const { getQueue } = require("../utils/music")
const ui = require("../utils/ui")

module.exports = {
    name: "queue",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        const queue = getQueue(jid)

        if (!queue.length) {
            return sock.sendMessage(jid, {
                text: ui.error("Queue is empty.")
            })
        }

        let text = ""

        queue.forEach((song, i) => {
            text += `${i + 1}. ${song.title}\n`
        })

        await sock.sendMessage(jid, {
            text: ui.box("🎶 QUEUE LIST", text)
        })
    }
}