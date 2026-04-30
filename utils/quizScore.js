const fs = require("fs")
const path = require("path")

const file = path.join(__dirname, "../database/quizScores.json")

function load() {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify({}))
    }
    return JSON.parse(fs.readFileSync(file))
}

function save(data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

function addPoint(user) {
    const data = load()

    if (!data[user]) data[user] = 0

    data[user] += 1

    save(data)
}

function getLeaderboard() {
    const data = load()

    return Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
}

module.exports = {
    addPoint,
    getLeaderboard
}