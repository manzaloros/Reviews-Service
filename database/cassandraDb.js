const models = require('express-cassandra');

/*
 *  Creates Cassandra tables based on models found in this directory:
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
      udts: {
        reviews: {
          rating: 'int',
          author: 'string',
          date: 'string',
          description: 'string',
        },
      },
    },
  },
  (err) => {
    if (err) {
      return console.log(err);
    }
    const guitar = new models.instance.Guitar({
      name: 'Test guitar',
      productId: 1,
      reviews: [
        {
          rating: 1,
          author: 'Zach Test',
          date: 'Right now, testing',
          description: 'Testing this mother',
        },
        {
          rating: 5,
          author: 'Zach Come at me',
          date: 'Testing Dark Soul',
          description: 'Hello Willie Dustice',
        },
      ],
    });
    guitar.save((error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('Guitar loaded!');
    });
    return;
  },
);
