const path = require('path');
const fs = require('fs');

const listFiles = (directoryPath, callback) => {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('listFiles Error: ' + err);
        }
        files.forEach(file => {
            console.log(file);
        });
        callback(null, files);
    });
};

const listFiles2 = function fromDir(startPath, filter){
    const filesArray = [];
    if (!fs.existsSync(startPath)){
        console.log("no dir ", startPath);
        return;
    }

    let files = fs.readdirSync(startPath);

    for(let i = 0; i<files.length; i++) {
        let filename = path.join(startPath, files[i]);
        let stat = fs.lstatSync(filename);
        if (!stat.isDirectory()) {
            if (filename.indexOf(filter) >= 0) {
                filesArray.push(filename.toString());
            }
        } else {
            filesArray.push(fromDir(filename, filter));
            filesArray.concat(fromDir(filename, filter));
        };
    };
    return filesArray;
};

module.exports = listFiles2;