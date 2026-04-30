sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update

    if (connection === "close") {
        const reason = lastDisconnect?.error?.output?.statusCode

        console.log("❌ Connection closed:", reason)

        // 🔥 ALWAYS RECONNECT (unless logged out)
        if (reason !== 401) {
            console.log("🔁 Reconnecting in 5 seconds...")
            setTimeout(() => startBot(), 5000)
        } else {
            console.log("🚫 Logged out. Need new auth.")
        }

    } else if (connection === "open") {
        console.log("✅ Nexus Bot Connected!")
    }
})