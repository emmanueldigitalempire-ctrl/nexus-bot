const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "../database/users.json")

function load() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({}))
    }
    return JSON.parse(fs.readFileSync(filePath))
}

function save(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

function getUser(id) {
    const data = load()

    if (!data[id]) {
        data[id] = {
            name: "Unknown",
            bio: "No bio set.",
            xp: 0,
            level: 1
        }
        save(data)
    }

    return data[id]
}

function setName(id, name) {
    const data = load()
    getUser(id)

    data[id].name = name
    save(data)
}

function setBio(id, bio) {
    const data = load()
    getUser(id)

    data[id].bio = bio
    save(data)
}

function getTitle(level) {
    if (level >= 20) return "👑 Legend"
    if (level >= 10) return "🔥 Elite"
    if (level >= 5) return "⚡ Rising"
    return "🌱 Beginner"
}

module.exports = {
    getUser,
    setName,
    setBio,
    getTitle
}