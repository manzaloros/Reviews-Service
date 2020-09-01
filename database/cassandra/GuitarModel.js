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
 *  Guitar Model for separate CSVs and no nested reviews:
 */
module.exports = {
  fields: {
    name: 'text',
    productId: 'int',
    _id: 'int',
  },
  key: ['productId'],
};
