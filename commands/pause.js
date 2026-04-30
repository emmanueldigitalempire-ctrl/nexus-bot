const { setPaused } = require("../utils/music")
const ui = require("../utils/ui")

module.exports = {
    name: "pause",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        setPaused(jid, true)

        await sock.sendMessage(jid, {
            text: ui.box("⏸️ PAUSED", "Playback paused")
        })
    }
}