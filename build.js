const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const defaultDir = 'dist';
const fileName = 'noisyboy_datapack.zip';
const outDir = process.argv[2] || defaultDir;
const out = path.join(__dirname, outDir, fileName);

console.log(out);

fs.mkdir(path.join(__dirname, outDir), (err) => {
    if (err && err.code !== 'EEXIST') console.log(err);
    else {
        const stream = fs.createWriteStream(out);
        const archive = archiver('zip');
        archive
            .directory('src', false)
            .on('error', (err) => console.log(err))
            .on('finish', () => console.log('Building finished'))
            .pipe(stream);
        archive.finalize();
    }
});

