module.exports = {
    name: "translate",
    execute: async (sock, msg) => {
        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ""
        const args = text.replace("/translate", "").trim()
        if (!args.includes("|")) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Usage: /translate [text] | [language]" })

        const [toTranslate, lang] = args.split("|").map(s => s.trim())
        if (!toTranslate || !lang) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Invalid format. Usage: /translate hello | french" })

        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(toTranslate)}&langpair=en|${lang}`)
            const data = await response.json()
            const translated = data.responseData.translatedText
            await sock.sendMessage(msg.key.remoteJid, { text: `🌐 Translated: ${translated}` })
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Could not translate. Try again." })
        }
    }
}