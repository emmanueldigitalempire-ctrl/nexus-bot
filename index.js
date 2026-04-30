const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
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

        } else if (connection === "open") {
            console.log("✅ Nexus Bot Connected!")
        }

        // 🔥 THIS IS THE MAGIC (PAIRING CODE)
        if (!sock.authState.creds.registered) {
            const code = await sock.requestPairingCode("2348120659660")
            console.log("🔑 Pairing Code:", code)
        }
    })

    sock.ev.on("creds.update", saveCreds)
}

startBot()