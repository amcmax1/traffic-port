const fs = require('fs');
const listFiles = require('./../listFiles.js');

let textFilesArray = Array.from(listFiles('rawData','000.txt'))
let textFilesArrayFlat = textFilesArray.flat(4)

const delTextFiles = (filesArray) => {
  filesArray.forEach(file => {
    fs.unlink(file, (err) => {
      if (err) throw err;
      console.log(`${file} was deleted`);
    });
  });
  console.log("RawData Text Files Deleted")
}
delTextFiles(textFilesArrayFlat)

