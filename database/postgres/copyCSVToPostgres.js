const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const db = require('../index');

/*
 * Copy guitars from CSV to database
 */
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
      resolve(db.sequelize.connectionManager.disconnect(client));
    });
  });
});

copyGuitars();

/*
 * Copy reviews from CSV to database
 */
const copyReviews = () => new Promise((resolve, reject) => {
  const stmt = `COPY "Reviews"("guitarId", rating, author, date, description)
                FROM STDIN
                DELIMITER ','
                CSV HEADER`;
  db.sequelize.connectionManager.getConnection().then((client) => {
    const stream = client.query(copyFrom(stmt));
    const fileStream = fs.createReadStream('./seedFiles/reviews.csv');
    fileStream.on('error', (err) => {
      client.end();
      reject(err);
    });
    fileStream.pipe(stream);
    stream.on('finish', () => {
      // returns promise
      resolve(db.sequelize.connectionManager.disconnect(client));
    });
  });
});

// copyReviews();
