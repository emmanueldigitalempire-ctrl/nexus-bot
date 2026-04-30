const intros = [
    "This next one hits different… 🔥",
    "Let me set the mood right… 🎧",
    "You might not be ready for this one 👀",
    "Energy going up with this track ⚡",
    "Stay locked in… this one’s smooth 🌀"
]

const outros = [
    "That was clean… real clean 😌",
    "Hope you felt that one 🖤",
    "We’re not slowing down anytime soon 🔥",
    "Next track loading… stay ready 🎶",
    "Let’s keep the vibe alive ✨"
]

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function intro() {
    return `🎧 *Nexus*: ${random(intros)}`
}

function outro() {
    return `🤖 *Nexus*: ${random(outros)}`
}

function skipReact() {
    return "⏭️ Nexus: Skipped… hope the next one hits better 😏"
}

function loopReact(enabled) {
    return enabled
        ? "🔁 Nexus: This one’s too good… looping it 🔥"
        : "🔁 Nexus: Alright, moving forward now."
}

module.exports = {
    intro,
    outro,
    skipReact,
    loopReact
}