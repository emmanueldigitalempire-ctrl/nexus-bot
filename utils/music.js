const yts = require("yt-search")

const queues = {}
const playing = {}
const paused = {}
const loop = {}

async function addToQueue(group, query) {
    if (!queues[group]) queues[group] = []

    const search = await yts(query)
    const video = search.videos[0]

    if (!video) return null

    const song = {
        title: video.title,
        url: video.url,
        duration: video.timestamp,
        author: video.author.name
    }

    queues[group].push(song)

    return {
        song,
        position: queues[group].length
    }
}

async function getRelatedSong(query) {
    const search = await yts(query)
    const video = search.videos[Math.floor(Math.random() * 5)]

    if (!video) return null

    return {
        title: video.title,
        url: video.url,
        duration: video.timestamp,
        author: video.author.name
    }
}

function getQueue(group) {
    return queues[group] || []
}

function nowPlaying(group) {
    return queues[group]?.[0] || null
}

function skipSong(group) {
    if (!queues[group] || queues[group].length === 0) return null
    queues[group].shift()
    return queues[group][0] || null
}

function isPlaying(group) {
    return playing[group] || false
}

function setPlaying(group, value) {
    playing[group] = value
}

function setPaused(group, value) {
    paused[group] = value
}

function isPaused(group) {
    return paused[group] || false
}

function setLoop(group, value) {
    loop[group] = value
}

function isLoop(group) {
    return loop[group] || false
}

function pushSong(group, song) {
    if (!queues[group]) queues[group] = []
    queues[group].push(song)
}

module.exports = {
    addToQueue,
    getQueue,
    nowPlaying,
    skipSong,
    isPlaying,
    setPlaying,
    setPaused,
    isPaused,
    setLoop,
    isLoop,
    getRelatedSong,
    pushSong
}