const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason
} = require("@whiskeysockets/baileys")

const pino = require("pino")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth")
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        auth: state,
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    })

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update

        if (connection === "close") {
            console.log("❌ Connection closed")

            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

            if (shouldReconnect) {
                console.log("🔁 Reconnecting...")
                startBot()
            }

        } else if (connection === "open") {
            console.log("✅ Nexus Bot Connected!")
        }

        // 🔥 FIXED PAIRING LOGIC (ONLY AFTER CONNECTING STATE)
        if (connection === "connecting") {
            if (!sock.authState.creds.registered) {
                try {
                    const code = await sock.requestPairingCode("2348120659660")
                    console.log("🔑 Pairing Code:", code)
                } catch (err) {
                    console.log("❌ Pairing error:", err.message)
                }
            }
        }
    })

    sock.ev.on("creds.update", saveCreds)
}

startBot()