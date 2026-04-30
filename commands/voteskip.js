const { voteSkip, resetVotes } = require("../utils/vote")
const { skipSong } = require("../utils/music")
const { playNext } = require("../utils/player")
const ui = require("../utils/ui")

module.exports = {
    name: "voteskip",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        // ❌ BLOCK PRIVATE CHAT
        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(jid, {
                text: ui.error("This command only works in groups.")
            })
        }

        try {
            const sender =
                msg.key.participant || msg.key.remoteJid

            // 🔥 GET GROUP INFO
            const metadata = await sock.groupMetadata(jid)
            const members = metadata.participants.length

            const result = voteSkip(jid, sender, members)

            if (result.passed) {
                resetVotes(jid)
                skipSong(jid)
                playNext(sock, jid)

                return sock.sendMessage(jid, {
                    text: ui.box("⏭️ SKIPPED", "Vote passed! Skipping song.")
                })
            }

            await sock.sendMessage(jid, {
                text: ui.box(
                    "🗳️ VOTE SKIP",
                    `Votes: ${result.voteCount}/${result.needed}`
                )
            })

        } catch (err) {
            console.log("VOTESKIP ERROR:", err)

            await sock.sendMessage(jid, {
                text: ui.error("Something went wrong while voting.")
            })
        }
    }
}