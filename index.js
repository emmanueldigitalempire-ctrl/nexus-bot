const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys")

const pino = require("pino")
const qrcode = require("qrcode-terminal")

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth")
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "silent" }),
    browser: ["Windows", "Chrome", "1.0.0"]
  })

  sock.ev.on("connection.update", (update) => {
    const { connection, qr } = update

    if (qr) {
      console.clear()
      console.log("📱 Scan this QR quickly:")
      qrcode.generate(qr, { small: true })
    }

    if (connection === "open") {
      console.log("✅ Connected successfully!")
    }

    if (connection === "close") {
      console.log("❌ Connection closed")
    }
  })

  sock.ev.on("creds.update", saveCreds)
}

startBot()