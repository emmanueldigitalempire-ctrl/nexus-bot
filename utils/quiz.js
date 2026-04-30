const fs = require("fs")
const path = require("path")

const file = path.join(__dirname, "../games/quiz.json")

let activeQuiz = {}

function getQuestions() {
    return JSON.parse(fs.readFileSync(file))
}

function startQuiz(group) {
    const questions = getQuestions()
    const q = questions[Math.floor(Math.random() * questions.length)]

    activeQuiz[group] = q
    return q.q
}

function checkAnswer(group, answer) {
    if (!activeQuiz[group]) return false

    const correct = activeQuiz[group].a.toLowerCase().trim()

    if (answer.toLowerCase().trim() === correct) {
        delete activeQuiz[group]
        return true
    }

    return false
}

module.exports = {
    startQuiz,
    checkAnswer
}