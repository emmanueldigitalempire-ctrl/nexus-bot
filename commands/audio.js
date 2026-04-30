const yts = require("yt-search")
const ui = require("../utils/ui")

module.exports = {
    name: "audio",
    execute: async (sock, msg, args) => {
        const jid = msg.key.remoteJid
        const query = args.join(" ")

        if (!query) {
            return sock.sendMessage(jid, {
                text: ui.error("Use: /audio song name")
            })
        }

        try {
            await sock.sendMessage(jid, {
                text: "⏳ Searching..."
            })

            const search = await yts(query)
            const video = search.videos[0]

            if (!video) {
                return sock.sendMessage(jid, {
                    text: ui.error("No results found.")
                })
            }

            // 🔥 CLEAN AUDIO RESPONSE (NO FAILURE)
            const text = `
🎵 *${video.title}*
👤 ${video.author.name}
⏱️ ${video.timestamp}

🔊 Play Audio:
${video.url}
`

            await sock.sendMessage(jid, {
                text: ui.box("🎧 AUDIO PLAYER", text)
            })

        } catch (err) {
            console.log("AUDIO ERROR:", err)

            await sock.sendMessage(jid, {
                text: ui.error("Audio temporarily unavailable.")
            })
        }
    }
}