import AWS from 'aws-sdk';

class Store {
    connect() {}
    upload(path, data) {}
}


export class AWSStore extends Store {


    connect() {
        const {
            AWS_ACCESS_KEY,
            AWS_SECRET_ACCESS_KEY,
            AWS_BUCKET
        } = process.env;

        console.log(process.env)

        if (!AWS_ACCESS_KEY) {
            throw new Error('Need access key');
        }

        if (!AWS_SECRET_ACCESS_KEY) {
            throw new Error('Need secret access key');
        }

        if (!AWS_BUCKET) {
            throw new Error('Need bucket');
        }

        this.__s3 = new AWS.S3({
            accessKeyId: AWS_ACCESS_KEY,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        });

        this.__bucket = AWS_BUCKET;
    }

    upload(path, stream) {
        if (!this.__s3 || !this.__bucket) {
            throw new Error('Need to connect before uploading');
        }

        const params = {
            Bucket: this.__bucket,
            Key: path,
            Body: stream,
            ACL:'public-read'
        };

        return new Promise((resolve, reject) => {
            this.__s3.upload(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Location);
                }
            });
        })
    }

}

