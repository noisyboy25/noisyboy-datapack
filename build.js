const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

console.log(process.argv);

const defaultOut = 'dist';
const outDir = process.argv[2] || defaultOut;
const out = path.join(__dirname, outDir, 'noisyboy_datapack.zip');

const stream = fs.createWriteStream(out);
console.log(out);
const archive = archiver('zip');

archive
    .directory('src', false)
    .on('error', (err) => console.log(err))
    .on('finish', () => console.log('Building finished'))
    .pipe(stream);
archive.finalize();