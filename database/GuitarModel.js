/*
 *  Guitar Model for Cassandra
 *  Not using guitarId for reviews object since it is nested in a guitar
 */
module.exports = {
  fields: {
    name: 'text',
    productId: 'int',
    reviews: {
      type: 'frozen',
      typeDef: '<list<review>>',
    },
  },
  key: ['productId'],
};
