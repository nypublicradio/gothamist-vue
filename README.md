# wnyc-vue

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Running in Docker
To run this app in a production-like setup, use docker.
The basic dev container can be run with the following commands:
```bash
docker build -t wnyc-3000-vue:latest
docker run -it -p 3000:3000 -e ENV=dev wnyc-3000-vue
```
If you'd like to run the app behind nginx, instead change the ENV variable
```bash
docker run -it -p 80:80 -e ENV=demo wnyc-3000-vue
```

## Deployment
For SSR, this app uses Nuxt. Nuxt runs within a Docker container deployed to our fastboot-<ENV>  ECS clusters. The deployment consists of two parts, the static files which are deployed to S3 [using gulp](https://nuxtjs.org/faq/deployment-aws-s3-cloudfront/), and the Nuxt docker container which is deployed using [nyprsetuptools](https://github.com/nypublicradio/nyprsetuptools). The following env vars are needed for the deployment to succeed.
 
| Variable              | Description                                  |
| --------------------- | -------------------------------------------- |
| NUXT_HOST             | Primary host at which Nuxt will be accessed. |
| NUXT_PORT             | Port used by Nuxt.                           |
| AWS_ACCESS_KEY_ID     | Needed by circleci to deploy.                |
| AWS_SECRET_ACCESS_KEY | Needed by circleci to deploy.                |
| AWS_BUCKET_NAME       | The S3 bucket to deploy static files to.     |
| AWS_CLOUDFRONT        | The ID of the cloudfront distribution fronting the app. |

### Notes

Set the theme in the assets/main.scss file

This project is optimized with lazy hydration (see https://github.com/maoberlehner/vue-lazy-hydration). Lazy hydration does not seem to play well with slots, so remove it from a component with slots if you're having issues.

Having issues with PostCSS or NodeSass? npm rebuild node-sass
