const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const testPath = path.join(__dirname, 'minecraft/saves/test/datapacks');

const fileName = 'noisyboy_datapack.zip';

const main = () => {
    if (process.argv[2] === 'test') {
        buildZip(testPath, fileName);
    } else {
        fs.mkdir(path.join(__dirname, 'dist'), (err) => {
            if (err && err.code !== 'EEXIST') {
                console.log(err);
                return;
            }

            buildZip(path.join(__dirname, 'dist'), fileName);
        });
    }
}

const buildZip = (_outDir, _fileName) => {
    console.log(`${_outDir}/${fileName}`);
    const stream = fs.createWriteStream(path.join(_outDir, _fileName));
    stream.on('error', (err) => {
        console.log(err);
        return;
    });
    const archive = archiver('zip');
    archive
        .directory('src', false)
        .on('error', (err) => console.log(err))
        .on('finish', () => console.log('Build finished'))
        .pipe(stream);
    archive.finalize();
}

main();