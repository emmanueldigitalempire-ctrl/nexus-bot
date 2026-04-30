module.exports = {
    name: "meme",
    execute: async (sock, msg) => {
        const memes = [
            "Why don't scientists trust atoms? Because they make up everything! 😂",
            "I told my wife she was drawing her eyebrows too high. She looked surprised. 🤨",
            "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾"
        ]
        const randomMeme = memes[Math.floor(Math.random() * memes.length)]
        await sock.sendMessage(msg.key.remoteJid, { text: randomMeme })
    }
}