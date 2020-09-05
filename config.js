/*
 * Module to gather environment variables
 */
module.exports = {
  pgUsername: process.env.POSTGRES_USER,
  pgPassword: process.env.POSTGRES_PASSWORD,
  pgHost: process.env.POSTGRES_HOST,
  pgPort: process.env.POSTGRES_PORT,
  numberOfRecords: process.env.NUMBER_OF_RANDOM_RECORDS,
  port: process.env.PORT,
  url: process.env.URL,
};
