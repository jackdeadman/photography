# Jack Deadman Photography Site

Welcome to the repository for my photography website. It is a site built with Svelte-kit. For the live site please visit:


[https://photos.jackdeadman.com](https://photos.jackdeadman.com)



## Developing

Once you've cloned the project and installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```


## Publishing a new photo

Copy the `example_env.sh` to `env.sh` and fill in the credentials as appropriate in order to upload files to AWS.

To create a new post and generate various versions of the images run.

```bash
node bin/upload.sh [slug] [path_to_image]
```

Where [slug] is the name that will be used in the URL of the post. The image that is being uploaded needs to contain EXIF information!

Once the images have been uploaded to AWS a yaml file will be created in `data/gallery/[slug],yaml`. Edit this to finish the post (i.e., add a name, description, alt and tags). To then view this new post in development run

```bash
npm run build-json
```

To publish the updates onto the web, simply push to the `main` branch.
