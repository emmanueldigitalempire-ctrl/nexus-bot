module.exports = {
    name: "joke",
    execute: async (sock, msg) => {
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: { 'Accept': 'application/json' }
            });
            const data = await response.json();
            await sock.sendMessage(msg.key.remoteJid, { text: `😂 ${data.joke}` });
        } catch (error) {
            await sock.sendMessage(msg.key.remoteJid, { text: "😂 Why don't scientists trust atoms? Because they make up everything!" });
        }
    }
}