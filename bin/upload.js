import fs from 'fs/promises';
import { AWSStore } from './lib/store.js';
import { Gallery } from './lib/gallery.js';

import pkg from 'exif';
const { ExifImage } = pkg;

import dotenv from 'dotenv';
dotenv.config({ path: 'env.sh' })

const store = new AWSStore();

function getExif(filename) {
    return new Promise((resolve, reject) => {
        new ExifImage({ image : filename }, function (error, exifData) {
            if (error)
                reject(error);
            else
                resolve(exifData);
        });
    });
}

if (process.argv.length !== 4) {
    console.error('node bin/upload.js [slug] [path_to_picture]')
    process.exit(1);
}

const slug  = process.argv[2];
const pathToPicture  = process.argv[3];

try {
    store.connect();
} catch (error) {
    console.error('Failed to connect to store.');
    console.error(error)
    process.exit(1);
}

(async () => {
    let image;
    try {
        image = await fs.readFile(pathToPicture);
    } catch (err) {
        console.error('Failed to load image.');
        process.exit(1);
    }

    let exif = await getExif(pathToPicture);

    const gallery = new Gallery(slug, image);

    await gallery.createVersions(store);
    const filename = await gallery.saveEntry(`data/gallery`, exif);
    console.log(filename);
})();
