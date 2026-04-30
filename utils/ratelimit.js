const limits = new Map()

function isRateLimited(user, limit = 5, windowMs = 10000) {
    const now = Date.now()
    const data = limits.get(user) || { count: 0, last: now }

    if (now - data.last > windowMs) {
        data.count = 0
        data.last = now
    }

    data.count++
    limits.set(user, data)

    return data.count > limit
}

module.exports = { isRateLimited }