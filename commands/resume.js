const { setPaused } = require("../utils/music")
const { playNext } = require("../utils/player")
const ui = require("../utils/ui")

module.exports = {
    name: "resume",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        setPaused(jid, false)
        playNext(sock, jid)

        await sock.sendMessage(jid, {
            text: ui.box("▶️ RESUMED", "Playback resumed")
        })
    }
}