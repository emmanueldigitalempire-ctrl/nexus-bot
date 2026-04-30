const votes = {}

function voteSkip(group, user, totalMembers) {
    if (!votes[group]) votes[group] = new Set()

    votes[group].add(user)

    const voteCount = votes[group].size
    const needed = Math.ceil(totalMembers / 2)

    return {
        voteCount,
        needed,
        passed: voteCount >= needed
    }
}

function resetVotes(group) {
    votes[group] = new Set()
}

module.exports = { voteSkip, resetVotes }