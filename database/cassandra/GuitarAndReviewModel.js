/*
 *  Guitar Model for Cassandra
 *  Not using guitarId for reviews object since it is nested in a guitar
 *  Uses the UDT for reviews
 */
// module.exports = {
//   fields: {
//     name: 'text',
//     productId: 'int',
//     reviews: {
//       type: 'frozen',
//       typeDef: '<list<review>>',
//     },
//   },
//   key: ['productId'],
// };

/*
 *  Guitar and Review model:
 */
module.exports = {
  fields: {
    id: 'int',
    productId: 'int',
    author: 'text',
    date: 'text',
    description: 'text',
    name: 'text',
    rating: 'int',
  },
  key: ['id'],
};
