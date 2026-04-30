const fs = require("fs")
const path = require("path")

const { checkAnswer } = require("./utils/quiz")
const { addPoint } = require("./utils/quizScore")

const commands = new Map()

const commandFiles = fs
    .readdirSync(path.join(__dirname, "commands"))
    .filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.set(command.name, command)
}

module.exports = async (sock, msg, text) => {
    try {
        if (!text) return

        const jid = msg.key.remoteJid

        if (msg.key.fromMe) return

        const sender =
            msg.key.participant || msg.key.remoteJid

        const userId = sender.split(":")[0]

        // 🎮 QUIZ ANSWER SYSTEM
        const correct = checkAnswer(jid, text)

        if (correct) {
            addPoint(userId)

            return sock.sendMessage(jid, {
                text: "🎉 Correct! +1 point 🔥"
            })
        }

        // ⚙️ COMMAND SYSTEM
        if (text.startsWith("/")) {
            const args = text.slice(1).trim().split(" ")
            const cmd = args.shift().toLowerCase()

            const command = commands.get(cmd)

            if (!command) {
                return sock.sendMessage(jid, {
                    text: "❌ Unknown command"
                })
            }

            return await command.execute(sock, msg, args)
        }

    } catch (err) {
        console.log("HANDLER ERROR:", err)
    }
}