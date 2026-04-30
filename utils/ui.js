function box(title, content) {
    return `╔═══〔 ${title} 〕═══╗\n${content}\n╚══════════════════╝`
}

function error(msg) {
    return `❌ ${msg}`
}

function success(msg) {
    return `✅ ${msg}`
}

function info(msg) {
    return `ℹ️ ${msg}`
}

module.exports = {
    box,
    error,
    success,
    info
}