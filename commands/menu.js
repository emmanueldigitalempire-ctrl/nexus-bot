const ui = require("../utils/ui")

module.exports = {
    name: "menu",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        const content = `
⚙️ ADMIN
/mute
/unmute
/antilink on|off
/warn @user

🤖 AI
/ai question

🎮 GAMES
/truth
/dare
/quiz
/ship
/wyr
/never

🎵 MUSIC
/play song

🛡️ SYSTEM
Anti-spam ✅
Anti-link ✅
`

        await sock.sendMessage(jid, {
            text: ui.box("👑 NEXUS BOT", content)
        })
    }
}