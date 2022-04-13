function parseline(line) {
    const data = line.split('|');
    return {
        ip: data[0],
        user_agent: data[1]
    }
}

module.exports = parseline;
