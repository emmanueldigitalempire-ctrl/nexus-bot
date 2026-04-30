const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "../database/levels.json")

// ensure file exists
function ensureFile() {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true })
        fs.writeFileSync(filePath, JSON.stringify({}))
    }
}

function getData() {
    ensureFile()
    return JSON.parse(fs.readFileSync(filePath))
}

function saveData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

function addXP(user, group) {
    const data = getData()

    if (!data[group]) data[group] = {}
    if (!data[group][user]) {
        data[group][user] = { xp: 0, level: 1 }
    }

    data[group][user].xp += 10

    let leveledUp = false

    if (data[group][user].xp >= data[group][user].level * 100) {
        data[group][user].xp = 0
        data[group][user].level += 1
        leveledUp = true
    }

    saveData(data)

    return {
        ...data[group][user],
        leveledUp
    }
}

function getUser(user, group) {
    const data = getData()
    return data[group]?.[user]
}

function getTop(group) {
    const data = getData()
    if (!data[group]) return []

    return Object.entries(data[group])
        .sort((a, b) => b[1].level - a[1].level)
        .slice(0, 10)
}

module.exports = { addXP, getUser, getTop }