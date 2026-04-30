const { getMemory } = require("../utils/memory")
const ui = require("../utils/ui")

module.exports = {
    name: "memory",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid
        const userId = (msg.key.participant || jid).split(":")[0]

        const memory = getMemory(userId)

        if (!memory.length) {
            return sock.sendMessage(jid, {
                text: ui.error("No memory yet.")
            })
        }

        let text = ""

        memory.slice(-10).forEach((m, i) => {
            text += `${i + 1}. ${m.text}\n`
        })

        await sock.sendMessage(jid, {
            text: ui.box("🧠 YOUR MEMORY", text)
        })
    }
}