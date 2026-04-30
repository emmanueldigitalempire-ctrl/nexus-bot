const { setLoop, isLoop } = require("../utils/music")
const nexus = require("../utils/nexusAI")

module.exports = {
    name: "loop",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        const current = isLoop(jid)
        setLoop(jid, !current)

        await sock.sendMessage(jid, {
            text: nexus.loopReact(!current)
        })
    }
}