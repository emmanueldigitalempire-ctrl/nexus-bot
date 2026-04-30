module.exports = {
    name: "weather",
    execute: async (sock, msg) => {
        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ""
        const city = text.replace("/weather", "").trim()
        if (!city) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Provide a city. Usage: /weather [city]" })

        try {
            const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=3`);
            const weather = await response.text();
            await sock.sendMessage(msg.key.remoteJid, { text: `🌤️ ${weather}` });
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Could not fetch weather. Try again." });
        }
    }
}