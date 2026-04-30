const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason
} = require("@whiskeysockets/baileys")

const pino = require("pino")
const fs = require("fs")
const path = require("path")

// 🔥 Load handler
const handler = require("./handler")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth")
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        auth: state,
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        printQRInTerminal: false // 🚫 no QR in production
    })

    // 🔥 Connection handler
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode

            console.log("❌ Connection closed:", reason)

            if (reason !== DisconnectReason.loggedOut) {
                console.log("🔁 Reconnecting...")
                startBot()
            } else {
                console.log("🚫 Logged out. Delete auth and restart.")
            }

        } else if (connection === "open") {
            console.log("✅ Nexus Bot Connected!")
        }
    })

    // 🔥 Save session
    sock.ev.on("creds.update", saveCreds)

    // 🔥 Messages handler
    sock.ev.on("messages.upsert", async (m) => {
        try {
            const msg = m.messages[0]
            if (!msg.message) return

            await handler(sock, msg)

        } catch (err) {
            console.log("HANDLER ERROR:", err.message)
        }
    })
}

// 🚀 Start bot
startBot()