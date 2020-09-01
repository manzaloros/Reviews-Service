/*
 *  Guitar Model for Cassandra
 *  Not using guitarId for reviews object since it is nested in a guitar
 */
module.exports = {
  fields: {
    name: 'text',
    productId: 'int',
    reviews: {
      rating: 'int',
      author: 'string',
      date: 'string',
      description: 'string',
    },
  },
  key: ['productId'],
};
