const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const testDir = path.join(__dirname, 'minecraft/saves/test/');

const main = () => {
    const args = process.argv.slice(2);
    console.log(`Build: ${args.toString()}`);

    if (args.includes('test')) {
        fs.mkdir(path.join(__dirname, 'minecraft'), (err) => {
            if (err && err.code !== 'EEXIST') {
                console.log(err);
                return;
            }

            buildResPack(testDir, 'resources.zip');
            buildDataPack(path.join(testDir, 'datapacks'));
        });
    }

    if (args.includes('datapack')) {
        fs.mkdir(path.join(__dirname, 'dist'), (err) => {
            if (err && err.code !== 'EEXIST') {
                console.log(err);
                return;
            }

            buildDataPack(distDir);
        });
    }

    if (args.includes('resources')) {
        fs.mkdir(path.join(__dirname, 'dist'), (err) => {
            if (err && err.code !== 'EEXIST') {
                console.log(err);
                return;
            }

            buildResPack(distDir);
        });
    }
}

const buildDataPack = (outDir, fileName = 'noisyboy_datapack.zip') => {
    const srcDir = path.join(__dirname, 'src/datapack');

    buildZip(srcDir, outDir, fileName);
}

const buildResPack = (outDir, fileName = 'noisyboy_resources.zip') => {
    const srcDir = path.join(__dirname, 'src/resources');

    buildZip(srcDir, outDir, fileName);
}

const buildZip = (srcDir, outDir, fileName) => {
    console.log(path.join(outDir, fileName));

    const stream = fs.createWriteStream(path.join(outDir, fileName));
    stream.on('error', (err) => {
        console.log(err);
        return;
    });

    const archive = archiver('zip');
    archive
        .directory(path.join(srcDir), false)
        .on('error', (err) => console.log(err))
        .on('finish', () => console.log('Build finished'))
        .pipe(stream);
    archive.finalize();
}

main();