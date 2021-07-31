import photosJson from './photos.json'

const db = {
    photos: async function() {
        return photosJson.photos;
    },

    getBySlug: async function(slug) {
        return photosJson.slugs[slug];
    }
};

export default db;