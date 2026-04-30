const fs = require("fs")

module.exports = {
    name: "setrules",
    execute: async (sock, msg, args) => {
        const jid = msg.key.remoteJid

        let data = JSON.parse(fs.readFileSync("./welcome.json"))

        if (!data[jid]) return

        const text = args.join(" ")

        if (!text) {
            return sock.sendMessage(jid, {
                text: "❌ Provide rules."
            })
        }

        data[jid].rules = text
        fs.writeFileSync("./welcome.json", JSON.stringify(data, null, 2))

        sock.sendMessage(jid, { text: "✅ Rules updated." })
    }
}
