const { nowPlaying } = require("../utils/music")
const ui = require("../utils/ui")

module.exports = {
    name: "nowplaying",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        const song = nowPlaying(jid)

        if (!song) {
            return sock.sendMessage(jid, {
                text: ui.error("Nothing is playing.")
            })
        }

        const text = `
🎵 *${song.title}*
👤 ${song.author}
⏱️ ${song.duration}

🔗 ${song.url}
`

        await sock.sendMessage(jid, {
            text: ui.box("🎧 NOW PLAYING", text)
        })
    }
}