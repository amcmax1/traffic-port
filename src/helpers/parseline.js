function parseline(line) {
    const data = line.split('|');
    return {
        ip: data[0],
        user_agent: data[1]
    }
}

function parseLinetoTSV(line) {
    return line.split('|').join('\t');
}

module.exports = parseLinetoTSV

