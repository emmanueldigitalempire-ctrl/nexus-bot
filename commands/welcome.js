const fs = require("fs")

module.exports = {
    name: "welcome",
    execute: async (sock, msg, args) => {
        const jid = msg.key.remoteJid

        if (!jid.endsWith("@g.us")) {
            return sock.sendMessage(jid, { text: "❌ Group only command." })
        }

        let data = {}
        try {
            data = JSON.parse(fs.readFileSync("./welcome.json"))
        } catch {
            data = {}
        }

        // ✅ Ensure default exists
        if (!data["default"]) {
            data["default"] = {
                enabled: true,
                message: "Welcome to THE DIGITAL EMPIRE 👑",
                rules: "1. No spam\n2. Respect everyone"
            }
        }

        // ✅ Ensure group config exists (inherit from default)
        if (!data[jid]) {
            data[jid] = { ...data["default"] }
        }

        const option = args[0]

        if (option === "on") {
            data[jid].enabled = true

        } else if (option === "off") {
            data[jid].enabled = false

        } else if (option === "reset") {
            // 🔄 Reset to default
            data[jid] = { ...data["default"] }

            fs.writeFileSync("./welcome.json", JSON.stringify(data, null, 2))

            return sock.sendMessage(jid, {
                text: "🔄 Welcome settings reset to default."
            })

        } else {
            return sock.sendMessage(jid, {
                text: `
╔═══〔 👋 Welcome Settings 〕═══╗

/welcome on → Enable welcome
/welcome off → Disable welcome
/welcome reset → Reset to default

╚══════════════════════════╝
`
            })
        }

        fs.writeFileSync("./welcome.json", JSON.stringify(data, null, 2))

        return sock.sendMessage(jid, {
            text: `✅ Welcome system ${option}`
        })
    }
}