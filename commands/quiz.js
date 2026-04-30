const { startQuiz } = require("../utils/quiz")

module.exports = {
    name: "quiz",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        const question = startQuiz(jid)

        await sock.sendMessage(jid, {
            text: `🧠 QUIZ TIME:\n\n${question}`
        })
    }
}