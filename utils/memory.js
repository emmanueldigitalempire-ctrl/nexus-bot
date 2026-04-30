const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "../database/memory.json")

function load() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({}))
    }
    return JSON.parse(fs.readFileSync(filePath))
}

function save(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

function addMemory(userId, message) {
    const data = load()

    if (!data[userId]) data[userId] = []

    data[userId].push({
        text: message,
        time: Date.now()
    })

    // keep last 20 messages only
    if (data[userId].length > 20) {
        data[userId].shift()
    }

    save(data)
}

function getMemory(userId) {
    const data = load()
    return data[userId] || []
}

module.exports = {
    addMemory,
    getMemory
}