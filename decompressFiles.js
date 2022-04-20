const path = require('path');
const fs = require('fs');
const zlib = require('zlib');

const decompressFileToTxt = (file, callback) => {
    const unzip = zlib.createUnzip();
    const inp = fs.createReadStream(file);
    const out = fs.createWriteStream(file.replace('.gz', '.txt'));
    inp.pipe(unzip).pipe(out);
};

module.exports = decompressFileToTxt;