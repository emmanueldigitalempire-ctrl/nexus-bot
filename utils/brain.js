const { getMemory } = require("./memory")

function analyze(text) {
    text = text.toLowerCase()

    if (text.includes("hello") || text.includes("hi")) return "greet"
    if (text.includes("music")) return "music"
    if (text.includes("sad")) return "sad"
    if (text.includes("bored")) return "bored"
    if (text.includes("love")) return "love"

    return "normal"
}

function getReply(userId, text) {
    const memory = getMemory(userId)
    const last = memory.slice(-3).map(m => m.text).join(" ").toLowerCase()

    const intent = analyze(text)

    switch (intent) {
        case "greet":
            return "👋 Nexus: I’m here… what’s on your mind?"

        case "music":
            return "🎧 Nexus: Music again? You’ve got good taste."

        case "sad":
            return "🖤 Nexus: I can feel that… talk to me."

        case "bored":
            return "😏 Nexus: Try /play or /quiz… I’ve got options."

        case "love":
            return "❤️ Nexus: Love… that’s a dangerous game."

        default:
            // 🔥 MEMORY BASED RESPONSE
            if (last.includes("music")) {
                return "🎧 Nexus: You still thinking about music?"
            }

            if (last.includes("sad")) {
                return "🖤 Nexus: You okay? You sounded off earlier."
            }

            return "🤖 Nexus: I’m listening… go on."
    }
}

module.exports = { getReply }