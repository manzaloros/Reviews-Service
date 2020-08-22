# seller-reviews
> For displaying a seller's reviews. Instead of displaying an individual item's reviews, this module displays the reviews that the item's seller has received.

## Related Projects

  - https://github.com/HRR47-FEC-Burke/main-photo
  - https://github.com/HRR47-FEC-Burke/similar-listings-and-news
  - https://github.com/HRR47-FEC-Burke/sidebar

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#Requirements)
3. [Development](#Development)
4. [Production](#Production)
5. [Deployment](#Deployment)

## Usage
> Example URL: http://localhost:2625/item/24

## Requirements

- Node.js v12.x
  - https://nodejs.org/

- MongoDB v4.2.7
  - https://www.mongodb.com/

## Development

Execute all these commands from the repository's root directory.

### Installing Dependencies

```sh
npm install
```

### Seeding Database

```sh
npm run seed
```

Database will always be seeded with 100 item listings and 50 sellers.

> NOTE: Before seeding, go to ```database/index.js``` and uncomment out
> the mongoDB URL depending on if your service is local or deployed.

### Testing

```sh
npm run test
```

## Production

### Webpack

```sh
npm run build:watch
```

### Node Express Server

```sh
npm start
```

## Deployment

### Hosting Webpack Bundles From Cloud
> These require the dev-dependencies to be installed

- Create a file named ```aws-keys.json``` in the root directory, with the following contents:
```sh
{
  "AWSAccessKeyId": "<your-access-key-ID>",
  "AWSSecretKey": "<your-access-secret-key>",
  "bucket": "<your-bucket-name>"
}
```

- Run ```grunt deploy``` on the terminal

### Hosting Service On Docker
> Requirements:
> [Docker v19.03.12] (https://docs.docker.com/engine/install/)
> [Docker Compose v1.26.2] (https://docs.docker.com/compose/install/)

- Run ```docker-compose build``` to build a Docker image
- Run ```docker-compose up -d``` to start running the service on port 80
- Run ```docker-compose down``` to stop the service

> Running ```docker-compose up -d``` the first time will automatically build an image.
> However, if you want to make any changes afterwards, you need to run ```build```,
> take down the image with ```down```, and then put up the new image with ```up -d```.

> If you host the service in a shell, Docker and Nodejs will not work out of the box.
> You need to install them on your shell before you can make use of the Dockerfile and ```package.json```.
