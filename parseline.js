function parseline(line) {
    const data = line.split('|');
    return {
        ip: data[0],
        user_agent: data[1]
    }
}

function parselinetocsv(line) {
    const data = line.replace('|', ' , ');
    // add quotes or convert to TSV
    return data
}

module.exports = parseline

