# seller-reviews
> For displaying a seller's reviews. Instead of displaying an individual item's reviews, this module displays the reviews that the item's seller has received.

## Related Projects

  - https://github.com/HRR47-FEC-Burke/main-photo
  - https://github.com/HRR47-FEC-Burke/similar-listings-and-news
  - https://github.com/HRR47-FEC-Burke/sidebar
  
## Table of Contents

1. [Usage](#Usage)

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
