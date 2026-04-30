const fs = require("fs")

module.exports = {
    name: "antilink",
    execute: async (sock, msg, args) => {
        const jid = msg.key.remoteJid
        let data = {}

        try {
            data = JSON.parse(fs.readFileSync("./antilink.json"))
        } catch {
            data = {}
        }

        if (args[0] === "on") {
            data[jid] = true
        } else if (args[0] === "off") {
            delete data[jid]
        } else {
            return sock.sendMessage(jid, {
                text: "Usage: /antilink on | off"
            })
        }

        fs.writeFileSync("./antilink.json", JSON.stringify(data, null, 2))

        sock.sendMessage(jid, {
            text: `🔗 Anti-link ${args[0]}`
        })
    }
}