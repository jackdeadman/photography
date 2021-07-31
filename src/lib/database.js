import photosJson from './photos.json';

function time(str) {
    const [year, month, day] = str.split(' ')[0].split(':');
    return day + month*100 + year * 10000;
}

const db = {
    photos: async function() {
        return photosJson.photos.sort((p1, p2) => {
            return time(p2.meta.exif.DateTimeOriginal) - time(p1.meta.exif.DateTimeOriginal);
        });
    },

    getBySlug: async function(slug) {
        return photosJson.slugs[slug];
    }
};

export default db;