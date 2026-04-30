const { addToQueue, isPlaying } = require("../utils/music")
const { playNext } = require("../utils/player")
const ui = require("../utils/ui")

module.exports = {
    name: "play",
    execute: async (sock, msg, args) => {
        const jid = msg.key.remoteJid
        const query = args.join(" ")

        if (!query) {
            return sock.sendMessage(jid, {
                text: ui.error("Use: /play song name")
            })
        }

        const result = await addToQueue(jid, query)

        if (!result) {
            return sock.sendMessage(jid, {
                text: ui.error("No results found.")
            })
        }

        await sock.sendMessage(jid, {
            text: ui.box("🎧 ADDED", `${result.song.title}\nPosition: ${result.position}`)
        })

        // 🔥 AUTO START
        if (!isPlaying(jid)) {
            playNext(sock, jid)
        }
    }
}