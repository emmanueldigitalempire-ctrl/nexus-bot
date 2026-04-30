const { skipSong } = require("../utils/music")
const { playNext } = require("../utils/player")
const nexus = require("../utils/nexusAI")

module.exports = {
    name: "skip",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        skipSong(jid)

        await sock.sendMessage(jid, {
            text: nexus.skipReact()
        })

        playNext(sock, jid)
    }
}