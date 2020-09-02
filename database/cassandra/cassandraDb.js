const models = require('express-cassandra');

/*
 *  Creates Cassandra tables based on models found in this directory.
 *  Creates a user-defined review type
 */
models.setDirectory(__dirname).bind(
  {
    clientOptions: {
      contactPoints: ['127.0.0.1'],
      protocolOptions: { port: 9042 },
      keyspace: 'reviews',
      queryOptions: { consistency: models.consistencies.one },
    },
    ormOptions: {
      defaultReplicationStrategy: {
        class: 'SimpleStrategy',
        replication_factor: 1,
      },
      migration: 'safe',
      // udts: {
      //   review: {
      //     rating: 'int',
      //     author: 'text',
      //     date: 'text',
      //     description: 'text',
      //   },
      // },
    },
  },
  (err) => {
    if (err) {
      return console.log(err);
    }
    // Close all ORM connections
    models.close((e) => {
      if (e) {
        return console.log(e);
      }
    });
  },
);

// const guitar = new models.instance.Guitar({
//   name: 'Test guitar',
//   productId: 1,
// });
// Saving single guitar:
// guitar.save((error, result) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log('Guitar loaded!', result);
//   // Close all ORM connections
//   models.close((e) => {
//     if (e) {
//       console.log(e);
//     }
//   });
// });
// Sample reviews array:
// reviews: [
//   {
//     rating: 1,
//     author: 'Zach Test',
//     date: 'Right now, testing',
//     description: 'Testing this mother',
//   },
//   {
//     rating: 5,
//     author: 'Zach Come at me',
//     date: 'Testing Dark Soul',
//     description: 'Hello Willie Dustice',
//   },
// ],
