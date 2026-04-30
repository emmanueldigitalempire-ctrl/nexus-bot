const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys")

const P = require("pino")
const QRCode = require("qrcode-terminal")

const handler = require("./handler")

// 🔁 retry system
let retryCount = 0
const MAX_RETRIES = 5

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth")

    const sock = makeWASocket({
        logger: P({ level: "silent" }),
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    })

    sock.ev.on("creds.update", saveCreds)

    // 🔥 CONNECTION HANDLER
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update

        // 📱 QR DISPLAY
        if (qr) {
            console.log("\n📱 Scan this QR:\n")
            QRCode.generate(qr, { small: true })
        }

        // ❌ DISCONNECTED
        if (connection === "close") {
            const statusCode = lastDisconnect?.error?.output?.statusCode

            console.log("❌ Connection closed:", statusCode)

            // 🚫 LOGGED OUT → STOP
            if (statusCode === DisconnectReason.loggedOut) {
                console.log("🚫 Logged out. Delete auth folder and rescan QR.")
                return
            }

            // 🔁 RETRY SYSTEM
            if (retryCount < MAX_RETRIES) {
                retryCount++
                console.log(`🔁 Reconnecting... (${retryCount}/${MAX_RETRIES})`)

                setTimeout(() => {
                    startBot()
                }, 5000)
            } else {
                console.log("🛑 Too many retries. Fix your network.")
            }
        }

        // ✅ CONNECTED
        else if (connection === "open") {
            retryCount = 0
            console.log("✅ Nexus Bot Connected!")
        }
    })

    // 📩 MESSAGE HANDLER
    sock.ev.on("messages.upsert", async ({ messages }) => {
        try {
            const msg = messages[0]
            if (!msg.message) return

            const text =
                msg.message.conversation ||
                msg.message.extendedTextMessage?.text ||
                msg.message.imageMessage?.caption ||
                msg.message.videoMessage?.caption ||
                ""

            console.log("📩 MESSAGE:", text)

            await handler(sock, msg, text)

        } catch (err) {
            console.log("❌ MESSAGE ERROR:", err)
        }
    })
}

startBot()