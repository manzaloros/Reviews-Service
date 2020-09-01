const models = require('express-cassandra');

/*
 *  Creates tables based on models found in this directory:
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
    },
  },
  (err) => {
    if (err) {
      throw err;
    }
    const guitar = new models.instance.Guitar({
      name: 'Test guitar',
      productId: 1,
    });
    guitar.save((error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('Guitar loaded!');
    });
  },
);
