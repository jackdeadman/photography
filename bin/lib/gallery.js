import sharp from 'sharp';
import writeYamlFile from 'write-yaml-file';

class ImageVersion {}

class ImageVersionWebp extends ImageVersion {
    
    EXT = 'webp';
    
    async run(img) {
        return await sharp(img).webp().toBuffer();
    }
}


class ImageVersionWebpMedium extends ImageVersion {
    
    EXT = 'webp';
    
    async run(img) {
        return await sharp(img).resize(1000).webp().toBuffer();
    }
}

class ImageVersionWebpSmall extends ImageVersion {
    
    EXT = 'webp';
    
    async run(img) {
        return await sharp(img).resize(500).webp().toBuffer();
    }
}

class ImageVersionWebpTiny extends ImageVersion {
    
    EXT = 'webp';
    
    async run(img) {
        return await sharp(img).resize(100).webp().toBuffer();
    }
}

class ImageVersionJpeg extends ImageVersion {
    
    EXT = 'jpg';
    
    async run(img) {
        return await sharp(img).jpeg().toBuffer();
    }
}


class ImageVersionJpegMedium extends ImageVersion {
    
    EXT = 'jpg';
    
    async run(img) {
        return await sharp(img).resize(1000).jpeg().toBuffer();
    }
}

class ImageVersionJpegSmall extends ImageVersion {
    
    EXT = 'jpg';
    
    async run(img) {
        return await sharp(img).resize(500).jpeg().toBuffer();
    }
}

class ImageVersionJpegTiny extends ImageVersion {
    
    EXT = 'jpg';
    
    async run(img) {
        return await sharp(img).resize(100).jpeg().toBuffer();
    }
}


export class Gallery {

    constructor(slug, image) {
        this.slug = slug;
        this.image = image;

        this.versions = {
            full: ImageVersionWebp,
            med: ImageVersionWebpMedium,
            small: ImageVersionWebpSmall,
            tiny: ImageVersionWebpTiny,

            full_jpg: ImageVersionJpeg,
            med_jpg: ImageVersionJpegMedium,
            small_jpg: ImageVersionJpegSmall,
            tiny_jpg: ImageVersionJpegTiny
        };
    }

    async createVersions(uploader) {
        let urls = {};

        for (let [version, Processor] of Object.entries(this.versions)) {
            let processor = new Processor();
            
            urls[version] = await uploader.upload(
                `gallery/${version}/${this.slug}.${processor.EXT}`,
                await processor.run(this.image)
            )
        }

        this.versions = urls;
    }


    createEntry(meta) {
        return {
            name: '',
            description: '',
            alt: '',
            published: new Date().toUTCString(),
            tags: [],
            slug: this.slug,
            meta,
            versions: this.versions
        };
    }

    async saveEntry(location, exif) {
        let entry = this.createEntry(exif);
        let filename = `${location}/${this.slug}.yaml`;
        await writeYamlFile(filename, JSON.parse(JSON.stringify(entry)));
        return filename;
    }

}


// (async () => {
//     let g = new Gallery();
//     await g.createVersions('example', await fs.readFile(process.argv[2]), {
//         upload: (loc, buf) => console.log(loc, buf)
//     }) 
// })();

