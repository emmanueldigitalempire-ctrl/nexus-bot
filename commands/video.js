const yts = require("yt-search")
const ytdlp = require("yt-dlp-exec")
const fs = require("fs")
const path = require("path")
const ui = require("../utils/ui")

module.exports = {
    name: "video",
    execute: async (sock, msg, args) => {
        const jid = msg.key.remoteJid
        const query = args.join(" ")

        if (!query) {
            return sock.sendMessage(jid, {
                text: ui.error("Use: /video song name")
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

            const filePath = path.join(__dirname, "../downloads/video.mp4")

            await sock.sendMessage(jid, {
                text: `🎬 Downloading: ${video.title}`
            })

            await ytdlp(video.url, {
                format: "mp4",
                output: filePath.replace(/\\/g, "/"),
                noCheckCertificates: true
            })

            if (!fs.existsSync(filePath)) {
                throw new Error("Video not downloaded")
            }

            await sock.sendMessage(jid, {
                video: fs.readFileSync(filePath),
                caption: video.title
            })

            fs.unlinkSync(filePath)

        } catch (err) {
            console.log("VIDEO ERROR:", err)

            await sock.sendMessage(jid, {
                text: ui.error("Video failed.")
            })
        }
    }
}