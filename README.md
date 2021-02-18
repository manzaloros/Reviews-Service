# seller-reviews
> Displays reviews that an item's seller has received.

## Related Projects 

> Sidebar Service: https://github.com/HRR47-SDC-OMalley/sidebar-service
> Main Photo Service: https://github.com/HRR47-SDC-OMalley/main-photo

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#Requirements)
3. [Development](#Development)
4. [Production](#Production)
5. [Deployment](#Deployment)

## Usage
<!-- Legacy port: 2625 -->
> READ: http://localhost:3000/item/24

> POST a new product at a new product id: http://localhost:3000/reviews/api/item/endpoint/:listingId
>input: {string name, string condition, string category, string style, string brand, boolean asDescribed, string description, string seller}

>PUT (update) an existing seller with a provided object: http://localhost:3000/reviews/api/seller/
>input: name to update, updates {[] listings, [] listings_counts, [] reviews}

>DELETE all reviews for a product: http://localhost:3000/reviews/api/item/:listingId/reviews


## Requirements

- Node.js v12.x
  - https://nodejs.org/

- Postgres v12.4
  - https://www.postgresql.org/download/

- Cassandra v3.11.8
  - https://cassandra.apache.org/

<!-- - MongoDB v4.2.7
  - https://www.mongodb.com/ -->

## Development

Execute all these commands from the repository's root directory.

### Installing Dependencies

```sh
npm install
```
### Seeding CSV File

```sh
npm run seed
```

CSV will be seeded with x item listings.

### Database Setup

Postgres join table copy from tables to single CSV:
```sh
node database/postgres/copyToCSV.js
```

Create an index on the Reviews table once copied from CSV
```sh
CREATE INDEX ON “Reviews”(“guitarID”);
```

Cassandra copy from CSV file:
```sh
COPY guitarandreview(id,"productId",author,date,description,name,rating) FROM '~/Documents/projects/hrr47-sdc-omalley.nosync/Reviews-Service/database/seedFiles/guitarsAndReviews.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

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
> Starts nodemon and loads environment variables
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
