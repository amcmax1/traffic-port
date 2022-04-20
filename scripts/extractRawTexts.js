const fs = require('fs');
const listFiles = require('./../listFiles.js');
const decompressFileToTxt = require("../decompressFiles");

let filesArray = Array.from(listFiles('rawData','.gz'))
let filesArrayFlat = filesArray.flat(4)

const decompressFiles = (filesArray) => {
    console.time("BENCHMARK decompressFiles");
    filesArray.forEach(file => {
        decompressFileToTxt(file)
    })
    console.timeEnd("BENCHMARK decompressFiles")
}

decompressFiles(filesArrayFlat)

console.log("RawData Decompression Done")