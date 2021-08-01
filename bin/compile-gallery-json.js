import yaml from 'js-yaml';
import fs from 'fs';
import pkg from 'glob';
const { glob } = pkg;

try {
    // Add redundancy but allows for fast lookup
    let output = {
        photos: [],
        slugs: {},
        filters: {}
    };

    
    output.filters.tags = new Set([])
    output.filters.cameras = new Set([])
    output.filters.lenses = new Set([])

	glob('data/gallery/*.yaml', (err, matches) => {
	  for (let match of matches) {
			const doc = yaml.load(fs.readFileSync(match, 'utf8'));
			output.slugs[doc.slug] = doc;
            for (let tag in doc.tags) {
                output.filters.tags.add(tag);
            }

            console.log(match)
            output.filters.cameras.add(doc.meta.image.Model)
            output.filters.lenses.add(doc.meta.exif.LensModel)
            output.photos.push(doc);
		}

        output.filters.cameras = Array.from(output.filters.cameras);
        output.filters.tags = Array.from(output.filters.tags);
        output.filters.lenses = Array.from(output.filters.lenses);

        fs.writeFileSync('src/lib/photos.json', JSON.stringify(output));
	});
} catch (e) {
	console.log(e);
}
