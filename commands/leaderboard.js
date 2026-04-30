const { getLeaderboard } = require("../utils/quizScore")

module.exports = {
    name: "leaderboard",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid

        const top = getLeaderboard()

        if (!top.length) {
            return sock.sendMessage(jid, {
                text: "No scores yet."
            })
        }

        let text = "🏆 QUIZ LEADERBOARD\n\n"

        top.forEach((user, i) => {
            text += `${i + 1}. ${user[0]} — ${user[1]} pts\n`
        })

        await sock.sendMessage(jid, { text })
    }
}