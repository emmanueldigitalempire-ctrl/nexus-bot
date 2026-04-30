const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require("@whiskeysockets/baileys")

const pino = require("pino")

let sock // 🔥 keep global reference

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth")
  const { version } = await fetchLatestBaileysVersion()

  sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "silent" }),
    browser: ["Ubuntu", "Chrome", "20.0.04"]
  })

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update

    if (connection === "open") {
      console.log("✅ Nexus Bot Connected!")
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode

      console.log("❌ Connection closed:", reason)

      if (reason === DisconnectReason.loggedOut) {
        console.log("🚫 Logged out. Delete auth and login again.")
      } else {
        console.log("🔁 Reconnecting in 5 seconds...")
        setTimeout(() => startBot(), 5000)
      }
    }
  })

  sock.ev.on("creds.update", saveCreds)

  // 🔥 basic message handler (so bot can reply)
  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0]
    if (!msg.message) return

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ""

    const from = msg.key.remoteJid

    if (text.toLowerCase() === "/ping") {
      await sock.sendMessage(from, { text: "🏓 Pong! Nexus is alive." })
    }
  })
}

startBot()