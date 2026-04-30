const ytdlp = require("yt-dlp-exec")
const fs = require("fs")
const path = require("path")

const {
    nowPlaying,
    skipSong,
    setPlaying,
    isPaused,
    isLoop,
    getRelatedSong,
    pushSong
} = require("./music")

const { resetVotes } = require("./vote")
const nexus = require("./nexusAI")

async function playNext(sock, group) {
    if (isPaused(group)) return

    let song = nowPlaying(group)

    // 🎧 DJ MODE AUTO ADD
    if (!song) {
        const related = await getRelatedSong("trending music")

        if (related) {
            pushSong(group, related)

            await sock.sendMessage(group, {
                text: `🎧 DJ Mode: Adding ${related.title}`
            })

            song = related
        } else {
            setPlaying(group, false)
            return
        }
    }

    setPlaying(group, true)

    const filePath = path.join(__dirname, "../downloads/video.mp4")

    try {
        // 🎤 INTRO
        await sock.sendMessage(group, {
            text: nexus.intro()
        })

        // ▶️ PLAYING
        await sock.sendMessage(group, {
            text: `▶️ Playing: ${song.title}`
        })

        await ytdlp(song.url, {
            format: "mp4",
            output: filePath.replace(/\\/g, "/"),
            noCheckCertificates: true
        })

        await sock.sendMessage(group, {
            video: fs.readFileSync(filePath),
            caption: song.title
        })

        fs.unlinkSync(filePath)

        // 🎤 OUTRO
        await sock.sendMessage(group, {
            text: nexus.outro()
        })

        if (!isLoop(group)) {
            skipSong(group)
        }

        resetVotes(group)

        playNext(sock, group)

    } catch (err) {
        console.log("PLAYER ERROR:", err)

        skipSong(group)
        resetVotes(group)

        playNext(sock, group)
    }
}

module.exports = { playNext }