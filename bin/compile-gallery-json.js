import yaml from 'js-yaml';
import fs from 'fs';
import pkg from 'glob';
const { glob } = pkg;

try {
    // Add redundancy but allows for fast lookup
    let output = {
        photos: [],
        slugs: {}
    };

	glob('data/gallery/*.yaml', (err, matches) => {
	  for (let match of matches) {
			const doc = yaml.load(fs.readFileSync(match, 'utf8'));
			output.slugs[doc.slug] = doc;
            output.photos.push(doc);
		}

        fs.writeFileSync('src/lib/photos.json', JSON.stringify(output, null, 4));
	});
} catch (e) {
	console.log(e);
}
