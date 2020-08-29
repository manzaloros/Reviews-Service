const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const db = require('./guitarSchema.js');

// (async () => {
//   const query = `\\COPY "Guitars"(name, "productId", id)
//                 FROM './seedFiles/guitars.csv'
//                 DELIMITER ','
//                 CSV HEADER`;
//   try {
//     const [results] = await db.sequelize.query(query);
//     return results;
//   } catch (e) {
//     return console.log(e);
//   }
// })();

const copyGuitars = () => new Promise((resolve, reject) => {
  const stmt = `COPY "Guitars"(name, "productId", id)
                 FROM STDIN
                 DELIMITER ','
                 CSV HEADER`;
  db.sequelize.connectionManager.getConnection().then((client) => {
    const stream = client.query(copyFrom(stmt));
    const fileStream = fs.createReadStream('./seedFiles/guitars.csv');
    fileStream.on('error', (err) => {
      client.end();
      reject(err);
    });
    fileStream.pipe(stream);
    stream.on('finish', () => {
      // returns promise
      db.sequelize.connectionManager.releaseConnection();
    });
  });
});

copyGuitars();

// const { Pool } = require('pg');
// const copyFrom = require('pg-copy-streams').from;

// const pool = new Pool({
//   host: 'localhost',
//   database: 'reviews',
//   port: '5432',
// });

// pool.connect((err, client, done) => {
//   const stream = client.query(copyFrom('COPY "Guitars" FROM STDIN'));
//   const fileStream = fs.createReadStream('./seedFiles/guitars.csv');
//   fileStream.on('error', done);
//   stream.on('finish', done);
//   fileStream.pipe(stream);
// });
