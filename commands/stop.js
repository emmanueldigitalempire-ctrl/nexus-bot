const { setPlaying } = require("../utils/music")
const ui = require("../utils/ui")

module.exports = {
    name: "stop",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        setPlaying(jid, false)

        await sock.sendMessage(jid, {
            text: ui.box("⏹️ STOPPED", "Playback stopped")
        })
    }
}