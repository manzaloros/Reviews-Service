// const db = require('./guitarSchema.js');

// (async () => {
//   const query = `COPY "Guitars"(name, "productId", id)
//                 FROM '~/Documents/projects/hrr47-sdc-omalley.nosync/Reviews-Service/database/seedFiles/guitars.csv'
//                 DELIMITER ','
//                 CSV HEADER`;
//   try {
//     const [results] = await db.sequelize.query(query);
//     return results;
//   } catch (e) {
//     return console.log(e);
//   }
// })();

const { Pool } = require('pg');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;

const pool = new Pool();

pool.connect((err, client, done) => {
  const stream = client.query(copyFrom('COPY Guitars FROM STDIN'));
  const fileStream = fs.createReadStream('./seedFiles/guitars.csv');
  fileStream.on('error', done);
  stream.on('finish', done);
  fileStream.pipe(stream);
});
