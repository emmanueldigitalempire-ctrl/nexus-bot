async function getGroupInfo(sock, jid) {
    const meta = await sock.groupMetadata(jid)
    const participants = meta.participants
    return { meta, participants }
}

function isAdmin(participants, jid) {
    return participants.some(p =>
        p.id === jid && (p.admin === "admin" || p.admin === "superadmin")
    )
}

module.exports = {
    getGroupInfo,
    isAdmin
}
